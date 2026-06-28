"use client"

import { getDbUser } from "@/actions/user"
import { createClient } from "@/lib/supabase/client"
import { useUserStore } from "@/store/user-store"
import { useEffect } from "react"

const UserProvider = ({children}:{children:React.ReactNode})=>{
    const {setUser,clearUser} = useUserStore()

    useEffect(()=>{
        const supabase = createClient()

        getDbUser().then((user)=>{
            if(user)setUser(user)
                else clearUser()
        })

        const {data:{subscription}} = supabase.auth.onAuthStateChange(e =>{
            if(e === "SIGNED_OUT"){
                clearUser()
            }
            if(e === "SIGNED_IN"){
                getDbUser().then(user=>{
                    if(user)setUser(user)
                })
            }
        })
    },[])

    
    return <>{children}</>
}

export default UserProvider