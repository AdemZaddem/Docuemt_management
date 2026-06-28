"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: Props) => {
  // close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    // backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      {/* modal box — stop click from closing when clicking inside */}
      <div
        className="bg-white rounded-[16px] shadow-lg w-full max-w-md p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[8px] hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* content */}
        {children}
      </div>
    </div>
  )
}

export default Modal