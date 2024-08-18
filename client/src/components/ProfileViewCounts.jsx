import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'


const ProfileViewCounts = () => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        getResult()
    }, [])

    const {token} = useAuth()

    const getResult = async () => {
        const response = await fetch(
            "http://localhost:3000/api/auth/getprofileviewscount",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
        )
        const data = await response.json()
        setCount(data.data)
        console.log("profile data: ", data.data)
        console.log(count)
          
    }

  return (
    count
  )
}

export default ProfileViewCounts
