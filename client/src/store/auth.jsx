import { createContext, useContext, useEffect, useState } from "react";

// context
export const AuthContext = createContext()

// provider
export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")

    const storeTokenInStorage = (serverToken) => {
        return localStorage.setItem('token', serverToken)
    }


    let isLoggedIn = !!token


    // creating logout functionality in the context 
    const LogOutUser = () => {
        setToken("")
        return localStorage.removeItem('token')
    }


    const userAuthentication = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.ok) {
                const data = await response.json()
                setUser(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userAuthentication()
    }, [])

    const tokValue = token

    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInStorage, LogOutUser, user, token }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    return authContextValue
}