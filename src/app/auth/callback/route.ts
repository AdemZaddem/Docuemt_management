import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest)=>{
    const {searchParams,origin} = new URL(request.url)
    const code = searchParams.get('code')

    if(!code){
        return NextResponse.redirect(`${origin}/login`)
    }

    const supabase = await createClient()
    const {data:{user},error} = await supabase.auth.exchangeCodeForSession(code)

    if(error || !user)return NextResponse.redirect(`${origin}/login`)

        const existing = await prisma.user.findUnique({
            where:{id:user.id}
        })

        if(!existing){
            await prisma.user.create({
                data:{
                    id:user.id,
                    email:user.email!,
                    name:user.user_metadata?.name ?? user.email!,
                    avatarUrl:user.user_metadata?.avatarUrl ?? null,
                    role:"USER"
                }
            })

            await supabaseAdmin.auth.admin.updateUserById(user.id,{
                app_metadata:{role:"USER"}
            })
        }

        return NextResponse.redirect(`${origin}/dashboard`)
}