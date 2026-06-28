import { getRecentFiles } from "@/actions/files"
import { getFolders } from "@/actions/folders"
import { getDbUser } from "@/actions/user"
import { Upload, Files, Folder, TrendingUp, HardDrive, FolderPlus, Settings } from "lucide-react"
import Link from "next/link"
import { formatBytes } from "../utils"

const MAX_STORAGE = 1073741824

const getFileColor = (type: string) => {
  if (type.includes("pdf")) return { color: "text-red-500", bg: "bg-red-50" }
  if (type.includes("image")) return { color: "text-blue-500", bg: "bg-blue-50" }
  if (type.includes("sheet") || type.includes("excel")) return { color: "text-green-500", bg: "bg-green-50" }
  return { color: "text-[#4f46e5]", bg: "bg-[#4f46e5]/10" }
}

const Page = async () => {
  const [user, recentFiles, folders] = await Promise.all([
    getDbUser(),
    getRecentFiles(6),
    getFolders(),
  ])

  const storageUsed = user?.storageUsed ?? 0
  const storagePercent = Math.min((storageUsed / MAX_STORAGE) * 100, 100)

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const filesThisWeek = recentFiles.filter(
    (f) => new Date(f.createdAt) > oneWeekAgo
  ).length

  return (
    <div className="flex flex-col gap-8">

      
      <header className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}!</p>
        </div>
        <Link
          href="/dashboard/files"
          className="flex items-center gap-2 bg-[#4f46e5] text-white p-2 rounded-[12px] px-4 text-sm hover:bg-[#4338ca] transition"
        >
          <Upload size={18} />
          Quick Upload
        </Link>
      </header>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center justify-between bg-white rounded-[12px] p-4 border border-gray-200">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Total Files</p>
            <p className="text-2xl font-semibold">{recentFiles.length}</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-[12px]">
            <Files color="#55a5e2" />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-[12px] p-4 border border-gray-200">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Total Folders</p>
            <p className="text-2xl font-semibold">{folders.length}</p>
          </div>
          <div className="bg-[#4f46e5]/20 p-2 rounded-[12px]">
            <Folder color="#4f46e5" />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-[12px] p-4 border border-gray-200">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Files This Week</p>
            <p className="text-2xl font-semibold">+{filesThisWeek}</p>
          </div>
          <div className="bg-[#55ec5f]/20 p-2 rounded-[12px]">
            <TrendingUp color="#00cc0e" />
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        
        <div className="lg:col-span-2 bg-white p-5 rounded-[12px] border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Files</h2>
            <Link
              href="/dashboard/files"
              className="hover:bg-gray-100 rounded-[12px] px-4 py-2 text-sm transition text-gray-600"
            >
              View All
            </Link>
          </div>

          {recentFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Files size={32} className="mb-2" />
              <p className="text-sm">No files yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recentFiles.map((file) => {
                const { color, bg } = getFileColor(file.type)
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 rounded-[10px] bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className={`${bg} p-2 rounded-[8px] shrink-0`}>
                      <Files size={16} className={color} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(file.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-[12px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#4f46e5]/10 p-2 rounded-[8px]">
                <HardDrive size={18} className="text-[#4f46e5]" />
              </div>
              <h2 className="font-semibold text-gray-900">Storage</h2>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Used</span>
              <span>{formatBytes(storageUsed)} of {formatBytes(MAX_STORAGE)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div
                className="bg-[#4f46e5] h-2 rounded-full"
                style={{ width: `${storagePercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mb-4">
              {formatBytes(MAX_STORAGE - storageUsed)} available
            </p>
            <button className="w-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition py-2 rounded-[10px]">
              Upgrade Storage
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-[12px] p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <div className="flex flex-col gap-1">
              <Link
                href="/dashboard/files"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-2 rounded-[8px] hover:bg-gray-50 transition"
              >
                <Upload size={16} />
                Upload Files
              </Link>
              <Link
                href="/dashboard/folders"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-2 rounded-[8px] hover:bg-gray-50 transition"
              >
                <FolderPlus size={16} />
                Create Folder
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-2 rounded-[8px] hover:bg-gray-50 transition"
              >
                <Settings size={16} />
                Settings
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Page