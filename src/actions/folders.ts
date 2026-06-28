"use server"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export const getFolders = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  return await prisma.folder.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { files: true } },
    },
  })
}

export const getFolder = async(id:number)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return null

    return await prisma.folder.findUnique({
        where:{userId:user.id,id},
        include:{
            files:{orderBy:{createdAt:'desc'}},
            _count:{select:{files:true}}
        }
    })
}

export const createFolder = async(name:string)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return {error:"Not authenticated"}

    await prisma.folder.create({
        data:{name,userId:user.id}
    })

    revalidatePath('/dashbaord/folders')
}


export const deleteFolder = async(id:number)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return {error:"Not authenticated"}

    await prisma.folder.delete({
        where:{id,userId:user.id}
    })

    revalidatePath('/dashboard/folders')
}

export const renameFolder = async(id:number,name:string)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return {error:"Not authenticated"}

    await prisma.folder.update({
        where:{id,userId:user.id},
        data:{name}
    })

    revalidatePath('/dashboard/folders')
}
