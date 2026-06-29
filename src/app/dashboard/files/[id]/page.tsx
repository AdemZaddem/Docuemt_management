import { formatBytes, getFileIcon } from "@/app/utils";
import { getFile } from "@/actions/files";
import { ChevronLeft,Trash,FolderInput,Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDbUser } from "@/actions/user";
import DeleteBtn from "./delete-btn";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const file = await getFile(Number(id));
  if (!file) notFound();

  const { icon: Icon, color, bg } = getFileIcon(file.type);
  const fileSize = formatBytes(file.size)
  const user = await getDbUser()

  return (
  <div className="mx-auto max-w-7xl space-y-8">
    <Link
      href="/dashboard/files"
      className="group flex items-center gap-2 text-gray-500 transition hover:text-gray-900 w-fit"
    >
      <ChevronLeft className="transition group-hover:-translate-x-1" size={20} />
      <span className="font-medium">Back to Files</span>
    </Link>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] items-start">
      {/* Preview */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          className={`${bg} h-[520px] flex items-center justify-center border-b border-gray-200`}
        >
          <Icon size={110} className={color} />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-semibold text-gray-900 break-all">
            {file.name}
          </h1>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Details */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            File Details
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {file.type}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Size</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {fileSize}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Uploaded</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {new Date(file.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Uploaded By</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {user?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Actions
          </h2>

          <div className="space-y-4">
            <button className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base font-semibold text-gray-800 transition hover:bg-gray-200 flex items-center gap-2">
              <Download size={19}/>
              Download
            </button>

            <button className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base font-semibold text-gray-800 transition hover:bg-gray-200 flex items-center gap-2">
              <FolderInput size={19}/>
              Move to Folder
            </button>
              <DeleteBtn fileId = {file.id}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Page;
