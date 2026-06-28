"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Files, Folder, Settings, LogOut, Menu, X,ShieldCheck } from "lucide-react"
import { logout } from "@/actions/auth"
import { useState } from "react"
import { useUserStore } from "@/store/user-store"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/files", label: "Files", icon: Files },
  { href: "/dashboard/folders", label: "Folders", icon: Folder },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const DashboardSidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useUserStore()

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 p-2 rounded-[10px] shadow-sm"
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-[230px] border-r border-gray-200
          flex flex-col p-4 shrink-0 bg-white
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <Link
            href="/"
            className="font-semibold text-[#4f46e5] text-xl select-none"
          >
            Vaultly
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition
                  ${isActive
                    ? "bg-[#4f46e5]/10 text-[#4f46e5] font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

          {user?.role === "ADMIN" && (
            <button className="text-[#4f46e5] flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm hover:bg-gray-100 transition w-full cursor-pointer">
                <ShieldCheck />
                Admin Panel
            </button>
          )}
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm text-gray-600 hover:bg-gray-100 transition w-full cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </form>

      </aside>
    </>
  )
}

export default DashboardSidebar