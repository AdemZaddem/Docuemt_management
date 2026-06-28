"use client"

import { useTransition } from "react"
import Modal from "@/components/ui/model"
import { deleteFolder } from "@/actions/folders"

type Props = {
  isOpen: boolean
  onClose: () => void
  folderId: number
  folderName: string
}

const DeleteFolderModal = ({ isOpen, onClose, folderId, folderName }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteFolder(folderId)
      onClose()
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Folder">
      <div className="flex flex-col gap-5">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-900">{folderName}</span>?
          This will not delete the files inside it.
        </p>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-[10px] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete Folder"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteFolderModal