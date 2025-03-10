import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext()

export const StoreContextProvider = ({children})=>{
    const url = "https://utkal-crafts-backend.onrender.com"
    const [token, setToken] = useState("")
    const [user, setUser] = useState({})
    useEffect(()=>{
        const storedToken = localStorage.getItem("adminToken")
        if(storedToken){
            setToken(storedToken)
        }
    },[token])
    const contextVal = {
        url,
        token,
        setToken,
        user,
        setUser,
        
    }
    return (
        <StoreContext.Provider value={contextVal}>
            {children}
        </StoreContext.Provider>
    )
}