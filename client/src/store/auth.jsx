import { createContext, useContext, useState } from "react";

// context
export const AuthContext = createContext()

// provider
export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))

    const storeTokenInStorage = (serverToken) => {
        return localStorage.setItem('token', serverToken)
    }


    let isLoggedIn = !!token


    // creating logout functionality in the context 
    const LogOutUser = () => {
        setToken("")
        return localStorage.removeItem('token')
    }

    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInStorage, LogOutUser }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    return authContextValue
}