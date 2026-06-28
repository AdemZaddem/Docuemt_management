"use client"

import { useState, useRef, useTransition } from "react"
import { Upload } from "lucide-react"
import { uploadFile } from "@/actions/files"

const MAX_FILE_SIZE = 50 * 1024 * 1024
const MAX_STORAGE = 1 * 1024 * 1024 * 1024

type Props = {
  storageUsed: number
  folderId?: number
}

const FileUpload = ({ storageUsed, folderId }: Props) => {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const validate = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) return `${file.name} exceeds 50MB limit`
    if (storageUsed + file.size > MAX_STORAGE) return "Not enough storage space. You have reached your 1GB limit."
    return null
  }

  const handleFiles = async (fileList: FileList) => {
    setError("")
    const files = Array.from(fileList)
    console.log("files:", files)

    for (const file of files) {
      const validationError = validate(file)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    setUploading(true)
    startTransition(async () => {
      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)
        if (folderId) formData.append("folderId", String(folderId))
        console.log("uploading:", file.name)
        const result = await uploadFile(formData)
        console.log("result:", result)
      }
      setUploading(false)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)
  const handleClick = () => inputRef.current?.click()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-[16px] p-16
          flex flex-col items-center justify-center gap-3
          cursor-pointer transition-all
          ${isDragging
            ? "border-[#4f46e5] bg-[#4f46e5]/5"
            : "border-gray-200 bg-gray-50 hover:border-[#4f46e5]/50 hover:bg-[#4f46e5]/5"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />

        <div className={`p-4 rounded-full ${isDragging ? "bg-[#4f46e5]/10" : "bg-gray-100"}`}>
          <Upload size={28} className={isDragging ? "text-[#4f46e5]" : "text-gray-400"} />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            {uploading ? "Uploading..." : "Drag and drop files here, or click to browse"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            All file types supported · Max 50MB per file
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <div className="flex justify-between text-xs text-gray-400 px-1">
        <span>Storage used: {Math.round((storageUsed / MAX_STORAGE) * 100)}%</span>
        <span>{Math.round((MAX_STORAGE - storageUsed) / (1024 * 1024))} MB remaining</span>
      </div>
    </div>
  )
}

export default FileUpload