import { getFiles } from "@/actions/files";
import { getDbUser } from "@/actions/user";
import FileUpload from "@/components/dashbaord/file-upload";
import ListFiles from "@/components/ListFiles";
import { Upload, Search, Grid3x2, TableOfContents } from "lucide-react";

const Page = async () => {
  const files = await getFiles();
  const user = await getDbUser()
  return (
    <div className="flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Files</h1>
          <p>{files.length} files total</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4f46e5] text-white p-2 rounded-[12px] px-4 text-sm hover:bg-[#4338ca] transition">
          <Upload size={18} />
          Upload Files
        </button>
      </header>
      <FileUpload storageUsed={user?.storageUsed ?? 0}/>

      <ListFiles files={files}/>
    </div>
  );
};
export default Page;
