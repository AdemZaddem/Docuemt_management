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
