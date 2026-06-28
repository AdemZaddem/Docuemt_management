import { create } from "zustand"

type User = {
    id:string
    name:string
    email:string
    role:string
    avatarUrl:string | null
    storageUsed:number
}

type UserStore = {
    user:User | null
    setUser: (user:User) => void
    clearUser:()=>void
}

export const useUserStore = create<UserStore>((set)=>({
    user:null,
    setUser:(user)=>set({user}),
    clearUser:()=>set({user:null})
}))