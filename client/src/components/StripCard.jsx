import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from "../context/DarkModeContext"
import { useAuth } from '../store/auth'
const StripCard = (prop) => {
  const {token} = useAuth()
  const [userName, setUserName] = useState("")
  let totalName = ""
  let fullName;
  useEffect(() => {
    whoisauthor()
  }, [])

  const whoisauthor = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/whoisthis/${prop.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.ok) {
        const data = await response.json()
        totalName += data.data.firstName
        totalName += " "
        totalName += data.data.lastName
        setUserName(totalName)
      }
    } catch (err) {
      console.log("Error in whoisauthor frontend: ", err)
    }
  }

    const {isDarkMode} = useContext(DarkModeContext)

  return (
    <div className={`border p-1 rounded-md ${isDarkMode ? "" : ""}`}>
      <p>Total Name: {userName}</p>
      {prop.times}
    </div>
  )
}

export default StripCard
