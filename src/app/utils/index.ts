import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  File,
} from "lucide-react"

type FileIconConfig = {
  icon: React.ElementType
  color: string
  bg: string
}

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export const getFileIcon = (type: string): FileIconConfig => {
  if (type.includes("pdf"))
    return { icon: FileText, color: "text-red-500", bg: "bg-red-50" }

  if (type.includes("image"))
    return { icon: FileImage, color: "text-blue-500", bg: "bg-blue-50" }

  if (type.includes("video"))
    return { icon: FileVideo, color: "text-purple-500", bg: "bg-purple-50" }

  if (type.includes("audio"))
    return { icon: FileAudio, color: "text-pink-500", bg: "bg-pink-50" }

  if (
    type.includes("sheet") ||
    type.includes("excel") ||
    type.includes("csv")
  )
    return { icon: FileSpreadsheet, color: "text-green-500", bg: "bg-green-50" }

  if (
    type.includes("javascript") ||
    type.includes("typescript") ||
    type.includes("html") ||
    type.includes("css") ||
    type.includes("json") ||
    type.includes("xml")
  )
    return { icon: FileCode, color: "text-yellow-500", bg: "bg-yellow-50" }

  if (
    type.includes("zip") ||
    type.includes("rar") ||
    type.includes("tar") ||
    type.includes("gz")
  )
    return { icon: FileArchive, color: "text-orange-500", bg: "bg-orange-50" }

  if (
    type.includes("word") ||
    type.includes("document") ||
    type.includes("text")
  )
    return { icon: FileText, color: "text-blue-400", bg: "bg-blue-50" }

  return { icon: File, color: "text-gray-500", bg: "bg-gray-100" }
}