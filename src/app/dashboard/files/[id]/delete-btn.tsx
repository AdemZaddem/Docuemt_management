'use client'
import { deleteFile } from "@/actions/files"
import { Trash } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"
type Props = {
    fileId:number
}
const DeleteBtn = ({fileId}:Props) => {
    const [isPending,setIsPending] = useState<boolean>(false)
    const handleDeleteBtn = async()=>{
        setIsPending(true)
        await deleteFile(fileId)
        redirect('/dashboard/files')
        setIsPending(false)
    }
  return (
   <button onClick={handleDeleteBtn} className="w-full rounded-xl bg-red-600 px-4 py-4 text-base font-semibold text-white transition hover:bg-red-700 flex items-center gap-2">
        <Trash size={19}/>
        {isPending?'Deleting...':'Delete File'}
    </button>
  )
}
export default DeleteBtn