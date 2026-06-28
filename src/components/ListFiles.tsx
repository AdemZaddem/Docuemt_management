"use client";
import { Search, Grid3x2, TableOfContents, FileText } from "lucide-react";
import { useState } from "react";
import { File } from "../../generated/prisma/client";
import { formatBytes, getFileIcon } from "@/app/utils";
type Props = {
  files: File[];
};

const ListFiles = ({ files }: Props) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isGrid, setIsGrid] = useState<boolean>(true);

  const getFileColor = (type: string) => {
    if (type.includes("pdf")) return { color: "text-red-500", bg: "bg-red-50" };
    if (type.includes("image"))
      return { color: "text-blue-500", bg: "bg-blue-50" };
    if (type.includes("sheet") || type.includes("excel"))
      return { color: "text-green-500", bg: "bg-green-50" };
    return { color: "text-[#4f46e5]", bg: "bg-[#4f46e5]/10" };
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3 py-2">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search files..."
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="flex bg-white border border-gray-200 rounded-[10px] p-1 gap-1">
          <button
            onClick={() => setIsGrid(true)}
            className={`${isGrid ? "bg-gray-100" : "hover:bg-gray-200"} p-1.5 rounded-[7px] text-gray-600  transition`}
          >
            <Grid3x2 size={17} />
          </button>
          <button
            onClick={() => setIsGrid(false)}
            className={`${isGrid ? "hover:bg-gray-200" : "bg-gray-100"} p-1.5 rounded-[7px] text-gray-400  transition`}
          >
            <TableOfContents size={17} />
          </button>
        </div>
      </div>

      {isGrid ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files
            .filter((f) =>
              f.name.toLowerCase().includes(searchInput.toLowerCase()),
            )
            .map((file) => {
              const { icon: Icon, color, bg } = getFileIcon(file.type);
              return (
                <div
                  key={file.id}
                  className="bg-white p-6 rounded-[12px] border border-gray-200"
                >
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className={`${bg} p-2 rounded-[8px]`}>
                      <Icon size={28} className={color} />
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate w-full">
                      {file.name}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <p>{formatBytes(file.size)}</p>
                    <p>
                      {new Date(file.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {files
            .filter((f) =>
              f.name.toLowerCase().includes(searchInput.toLowerCase()),
            )
            .map((file) => {
              const { icon: Icon, color, bg } = getFileIcon(file.type);
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-4 bg-white px-4 py-3 rounded-[10px] border border-gray-200 hover:bg-gray-50 transition"
                >
                  <div className={`${bg} p-2 rounded-[8px] shrink-0`}>
                    <Icon size={18} className={color} />
                  </div>
                  <p className="flex-1 text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-400 shrink-0">
                    {formatBytes(file.size)}
                  </p>
                  <p className="text-sm text-gray-400 shrink-0 hidden sm:block">
                    {new Date(file.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default ListFiles;
