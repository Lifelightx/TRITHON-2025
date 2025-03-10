import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext()
// ... existing code ...
export const StoreContextProvider = ({children}) => {
    const url = "https://utkal-crafts-backend.onrender.com";
    const [token, setToken] = useState(() => localStorage.getItem("sellerToken") || ""); // Initialize with token from local storage
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedToken = localStorage.getItem("sellerToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const contextVal = {
        url,
        token,
        setToken,
        user,
        setUser,
    };

    return (
        <StoreContext.Provider value={contextVal}>
            {children}
        </StoreContext.Provider>
    );
};