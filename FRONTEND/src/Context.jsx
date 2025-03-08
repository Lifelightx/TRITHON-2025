import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext()

export const StoreContextProvider = ({children})=>{
    const url = "http://localhost:5000"
    const [token, setToken] = useState("")
    const [user, setUser] = useState({})
    const [cartData, setCartData] = useState({})
    useEffect(()=>{
        const storedToken = localStorage.getItem("token")
        const storedUser = JSON.parse(localStorage.getItem("user"))
        const storedCartData = JSON.parse(localStorage.getItem("cart"))
        if(storedToken){
            setToken(storedToken)
            setUser(storedUser)
            setCartData(storedCartData)
        }
    },[token])
    const contextVal = {
        url,
        token,
        setToken,
        user,
        setUser,
        cartData,
        setCartData
        
    }
    return (
        <StoreContext.Provider value={contextVal}>
            {children}
        </StoreContext.Provider>
    )
}