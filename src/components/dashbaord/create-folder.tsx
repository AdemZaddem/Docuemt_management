"use client"

import { useState, useTransition } from "react"
import Modal from "@/components/ui/model"
import { createFolder } from "@/actions/folders"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CreateFolderModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setError("Folder name is required")
    setError("")

    startTransition(async () => {
      await createFolder(name.trim())
      setName("")
      onClose()
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Folder">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Folder name</label>
          <input
            type="text"
            placeholder="e.g. Documents"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="border border-gray-200 rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#4f46e5] transition"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-[10px] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-[#4f46e5] text-white rounded-[10px] hover:bg-[#4338ca] transition disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Folder"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateFolderModal