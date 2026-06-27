import Link from "next/link"
const NavBar = () => {
  return (
    <div className="w-full border-b border-gray-300">
      <div className="max-w-[1200px] mx-auto flex justify-between p-4 items-center">
        <h1 className="font-semibold text-[#4f46e5] text-xl select-none">Vaulty</h1>
        <div className="flex gap-4">
            <Link href={'/login'} className="hover:bg-gray-100 rounded-[999px] px-4 py-1 transition cursor-pointer">Login</Link>
            <Link href={'/register'} className="bg-[#4f46e5] rounded-[999px] px-4 py-1 text-white transition cursor-pointer hover:bg-[#4f46e5]/90">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
export default NavBar