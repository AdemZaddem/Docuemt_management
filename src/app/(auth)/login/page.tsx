import Link from "next/link"
import LoginForm from "./login-form"
import {ChevronLeft} from 'lucide-react'

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50 gap-2 p-5">
    <Link href={'/'} className="group w-[300px] sm:w-[500px] flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
        <ChevronLeft 
          color="currentColor" 
          className="transition-transform duration-200 ease-in-out group-hover:-translate-x-1" 
        />
        <span className="text-sm font-medium">Go Back</span>
      </Link>
      <div className="bg-white border border-gray-200 rounded-[12px] shadow p-6 w-[300px] sm:w-[500px]">
        <h1 className="text-center text-2xl font-semibold mb-6">Welcome back</h1>
        <LoginForm/>
      </div>
    </div>
  )
}
export default LoginPage