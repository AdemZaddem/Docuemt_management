"use server"
import { prisma } from "@/lib/prisma"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"


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

export const createFile = async(data:{
    name:string
    size:number
    type:string
    storagePath:string
    folderId?:number
})=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return {error:"Not authenticated"}

    await prisma.file.create({
        data:{
            name:data.name,
            size:data.size,
            type:data.type,
            storagePath:data.storagePath,
            userId:user.id,
            folderId:data.folderId ?? null
        }
    })

    await prisma.user.update({
        where:{id:user.id},
        data:{storageUsed:{increment:data.size}}
    })

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/files')
}


export const deleteFile = async(id:number)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user)return {error:"Not authenticated"}

    const file = await prisma.file.findUnique({
        where:{id,userId:user.id},
        select:{size:true,storagePath:true}
    })

    if(!file) return {error:"File not found"}

    await supabaseAdmin.storage.from('files').remove([file.storagePath])

    await prisma.file.delete({
        where:{id,userId:user.id}
    })

    await prisma.user.update({
    where: { id: user.id },
    data: { storageUsed: { decrement: file.size } },
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/files")

}

export const uploadFile = async (formData: FormData) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const file = formData.get("file") as File
  const folderId = formData.get("folderId")

  if (!file) return { error: "No file provided" }

  // upload to Supabase Storage
  const fileName = `${user.id}/${Date.now()}-${file.name}`
  const { error: uploadError } = await supabaseAdmin.storage
    .from("files")
    .upload(fileName, file)

  if (uploadError) return { error: uploadError.message }

  await prisma.file.create({
    data: {
      name: file.name,
      size: file.size,
      type: file.type,
      storagePath: fileName,
      userId: user.id,
      folderId: folderId ? Number(folderId) : null,
    },
  })

  await prisma.user.update({
    where: { id: user.id },
    data: { storageUsed: { increment: file.size } },
  })

  revalidatePath("/dashboard/files")
  revalidatePath("/dashboard")
}