import React, { useContext } from 'react'
import { DarkModeContext } from "../context/DarkModeContext"
const StripCard = () => {
    const {isDarkMode} = useContext(DarkModeContext)
  return (
    <div className={`border p-1 ${isDarkMode ? "" : ""}`}>
      
    </div>
  )
}

export default StripCard
