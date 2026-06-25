"use client";

import { GoogleIcon, LinkedInIcon } from "@/components/icons/oauth-icons";
import Link from 'next/link'

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="you@exemple.com"
          className="border px-4 py-2 rounded-[12px] border-gray-400 bg-gray-50 focus:outline-[#4338ca]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="border px-4 py-2 rounded-[12px] border-gray-400 bg-gray-50 focus:outline-[#4338ca]"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 bg-[#4f46e5] text-white font-semibold rounded-[12px] px-5 py-3 text-sm font-medium transition hover:bg-[#4338ca] justify-center cursor-pointer"
      >
        Continue
      </button>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      <button type="button" className="flex justify-center gap-3 items-center font-semibold bg-gray-100 py-2 rounded-[12px] cursor-pointer transition hover:bg-gray-200">
        <GoogleIcon/>
        <span>Continue with Google</span>
      </button>
      <button type="button" className="flex justify-center gap-3 items-center font-semibold bg-gray-100 py-2 rounded-[12px] cursor-pointer transition hover:bg-gray-200">
        <LinkedInIcon/>
        <span>Continue with LinkedIn</span>
      </button>
      <p className="text-center mt-3 text-sm">Don&apos;t have an account? <Link href={'/register'} className="text-[#4338ca] font-semibold hover:underline">Sign up</Link></p>
    </form>
  );
};
export default LoginForm;
