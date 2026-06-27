"use server"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const register = async(data:{
    name:string,
    email:string,
    password:string
})=>{
    const supabase = await createClient()

    const {data:authData,error} = await supabase.auth.signUp({
        email:data.email,
        password:data.password,
        options:{
            data:{
                name:data.name,
                role:"USER"
            }
        }
    })

    if(error)return {error:error.message}
    if(!authData.user)return {error:"Something went wrong"}

    await prisma.user.create({
        data:{
            id:authData.user.id,
            email:data.email,
            name:data.name,
            role:"USER"
        }
    })

    redirect('/dashboard')
}

export const login = async(data:{email:string,password:string})=>{
    const supabase = await createClient()

    const {error} = await supabase.auth.signInWithPassword({
        email:data.email,
        password:data.password
    })

    if(error)return{error:error.message}
    redirect("/dashbaord")
}


export const logout = async()=>{
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}


export const loginWithGoogle = async ()=>{
    const supabase = await createClient()
    const {data,error} = await supabase.auth.signInWithOAuth({
        provider:'google',
        options:{
            redirectTo:`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
    })

    if(error)redirect('/login')
    if(data.url)redirect(data.url)
}


export const loginWithLinkedIn = async ()=>{
    const supabase = await createClient()
    const {data,error} = await supabase.auth.signInWithOAuth({
        provider:"linkedin_oidc",
        options:{
            redirectTo:`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
    })
    if(error)redirect('/login')
    if(data.url)redirect(data.url)
}