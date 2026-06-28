import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

export const getFiles = async()=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return[]
    return await prisma.file.findMany({
        where:{userId:user.id},
        orderBy:{createdAt:'desc'}
    })
}


export const getFilesByFolder = async(folderId:number)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return []
    return await prisma.file.findMany({
        where:{userId:user.id,folderId},
        orderBy:{createdAt:'desc'}
    })
}

export const getRecentFiles = async(limit = 6) =>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return[]

    return await prisma.file.findMany({
        where:{userId:user.id},
        orderBy:{createdAt:'desc'},
        take:limit,
        include:{folder:{select:{name:true}}}
    })
}