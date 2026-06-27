import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "./types";
import { hasPermission } from "./lib/permission";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const ADMIN_PREFIXES = ["/admin"];

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
        cookies:{
            getAll(){
                return request.cookies.getAll()
            },
            setAll(cookieToSet){
                cookieToSet.forEach(({name,value})=>{
                    request.cookies.set(name,value)
                })
                supabaseResponse = NextResponse.next({request})
                cookieToSet.forEach(({name,value,options})=>{
                    supabaseResponse.cookies.set(name,value,options)
                })
            }
        }
    }
  );

  const {data:{user}} = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const role = (user?.app_metadata.role ?? user?.user_metadata.role) as Role

  const isAuthRoute = AUTH_ROUTES.some(route => path.startsWith(route))
  const isProtected = PROTECTED_PREFIXES.some(prefix => path.startsWith(prefix))
  const isAdminRoute = ADMIN_PREFIXES.some(prefix => path.startsWith(prefix))

  if(!user && isProtected) {
    return NextResponse.redirect(new URL('/login',request.url))
  }

  if(user && isAuthRoute){
    if(hasPermission(role,"ADMIN"))return NextResponse.redirect(new URL('/admin',request.url))
    return NextResponse.redirect(new URL('/dashboard',request.url))
  }

  if(user && isAdminRoute && !hasPermission(role,"ADMIN")){
    return NextResponse.redirect(new URL('/dashboard',request.url))
  }

  if(user && path.startsWith('/dashboard') && hasPermission(role,"ADMIN")){
    return NextResponse.redirect(new URL('/admin',request.url))
  }

  return supabaseResponse
}

export const config = {
    matcher:['/dashboard/:path*','/admin/:path*',"/login","/register"]
}
