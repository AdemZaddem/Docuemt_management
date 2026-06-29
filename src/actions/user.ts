"use server"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

export const getDbUser = async ()=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return null
    return await prisma.user.findUnique({
        where:{id:user.id}
    })
}


export const updateProfile = async(data:{avatar:string,name:string,email:string})=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return{error:"Not authenticated"}
    return await prisma.user.update({
        where:{id:user.id},
        data:{
            name:data.name,
            avatarUrl:data.avatar
        }
    })
}


export const updatePassword = async(data:{currentPassword:string,newPassword:string})=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return{error:"Not authenticated"}

    //check current password by signin

}