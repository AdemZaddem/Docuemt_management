"use client"

import { useState, useTransition } from "react"
import { register, loginWithGoogle, loginWithLinkedIn } from "@/actions/auth"
import Link from "next/link"
import { GoogleIcon, LinkedInIcon } from "@/components/icons/oauth-icons"

const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    startTransition(async () => {
      const result = await register({ name, email, password })
      if (result?.error) setError(result.error)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2.5 rounded-[12px] border-gray-200 bg-gray-50 text-sm focus:outline-[#4338ca]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2.5 rounded-[12px] border-gray-200 bg-gray-50 text-sm focus:outline-[#4338ca]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2.5 rounded-[12px] border-gray-200 bg-gray-50 text-sm focus:outline-[#4338ca]"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 bg-[#4f46e5] text-white font-medium rounded-[12px] px-5 py-2.5 text-sm transition hover:bg-[#4338ca] justify-center cursor-pointer mt-1 disabled:opacity-50"
      >
        {isPending ? "Creating account..." : "Create Account"}
      </button>

      <div className="relative flex py-3 items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink mx-4 text-gray-400 text-xs">Or continue with</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <form action={loginWithGoogle}>
        <button
          type="submit"
          className="w-full flex justify-center gap-3 items-center text-sm font-medium text-gray-700 bg-gray-100 py-2.5 rounded-[12px] cursor-pointer transition hover:bg-gray-200"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </form>

      <form action={loginWithLinkedIn}>
        <button
          type="submit"
          className="w-full flex justify-center gap-3 items-center text-sm font-medium text-gray-700 bg-gray-100 py-2.5 rounded-[12px] cursor-pointer transition hover:bg-gray-200"
        >
          <LinkedInIcon />
          <span>Continue with LinkedIn</span>
        </button>
      </form>

      <p className="text-center mt-2 text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#4338ca] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm