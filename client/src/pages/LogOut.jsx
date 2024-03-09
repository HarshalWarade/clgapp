import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

const LogOut = () => {
    
    const { LogOutUser } = useAuth()

    useEffect(() => {
        LogOutUser()
    }, [LogOutUser])

    return <Navigate to={'/'} />

}


export default LogOut