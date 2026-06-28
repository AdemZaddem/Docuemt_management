import { getFolders } from "@/actions/folders"
import FoldersClient from "./folders-client"

const Page = async () => {
  const folders = await getFolders()

  return (
    <div className="flex flex-col gap-8">
      <FoldersClient folders={folders} />
    </div>
  )
}

export default Page