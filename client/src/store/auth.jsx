import { createContext, useContext, useEffect, useState } from "react";

// context
export const AuthContext = createContext()

// provider -> ye provide krega further run me
export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")
    const [id, setid] = useState(user._id)

    const storeTokenInStorage = (serverToken) => {
        return localStorage.setItem('token', serverToken)
    }


    let isLoggedIn = !!token


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
                setid(user._id)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userAuthentication()
    }, [])

    const tokValue = token

    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInStorage, LogOutUser, user, token, id }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    return authContextValue
}