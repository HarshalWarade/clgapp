import React, { useContext } from 'react'
import { useAuth } from '../store/auth'
import { DarkModeContext } from '../context/DarkModeContext'
const SomeNav = () => {
    const {user} = useAuth()
    const {isDarkMode} = useContext(DarkModeContext)
  return (
    <div className={`${ isDarkMode ? "" : "bg-gray-300" }`}>
        {user.username}
    </div>
  )
}

export default SomeNav
