"use client"

import { useState } from "react"
import { Plus, Folder, Trash } from "lucide-react"
import CreateFolderModal from "@/components/dashbaord/create-folder"
import DeleteFolderModal from "@/components/dashbaord/delete-folder"

type Folder = {
  id: number
  name: string
  _count: { files: number }
}

type Props = {
  folders: Folder[]
}

const FoldersClient = ({ folders }: Props) => {
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null)

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">Folders</h1>
          <p className="text-gray-400 text-sm">{folders.length} folders</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 bg-[#4f46e5] text-white py-2 rounded-[10px] px-4 text-sm font-medium hover:bg-[#4338ca] transition cursor-pointer"
        >
          <Plus size={16} />
          New Folder
        </button>
      </header>

      {folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <div className="bg-gray-100 p-4 rounded-full">
            <Folder size={28} className="text-gray-300" />
          </div>
          <p className="text-sm">No folders yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="group relative bg-white p-5 border border-gray-200 rounded-[14px] transition hover:border-[#4f46e5]/40 hover:shadow-sm cursor-pointer"
            >
              <div className="flex flex-col items-start gap-3">
                <div className="p-2.5 bg-[#4f46e5]/10 rounded-[10px]">
                  <Folder size={22} className="text-[#4f46e5]" />
                </div>
                <div className="flex flex-col gap-0.5 w-full pr-6">
                  <p className="font-medium text-gray-900 truncate">{folder.name}</p>
                  <p className="text-xs text-gray-400">
                    {folder._count.files} {folder._count.files === 1 ? "file" : "files"}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setDeleteTarget(folder)
                }}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-[6px] hover:bg-red-50"
              >
                <Trash size={15} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      <CreateFolderModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <DeleteFolderModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        folderId={deleteTarget?.id ?? 0}
        folderName={deleteTarget?.name ?? ""}
      />
    </>
  )
}

export default FoldersClient