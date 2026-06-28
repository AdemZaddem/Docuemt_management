import Link from "next/link"
import { LayoutDashboard, Files, Folder, Settings, LogOut } from "lucide-react"
import { logout } from "@/actions/auth"
import DashboardSidebar from "@/components/dashbaord/sidebar"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/files", label: "Files", icon: Files },
  { href: "/dashboard/folders", label: "Folders", icon: Folder },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar/>
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout