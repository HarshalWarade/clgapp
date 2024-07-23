import React, { useState, useEffect, useContext } from "react"
import { useAuth } from "../store/auth"
import { DarkModeContext } from "../context/DarkModeContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Comment from "../pages/Comment"
import StripCard from "./StripCard"

const ProfileView = () => {
  const [views, setViews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDarkMode } = useContext(DarkModeContext)
  const { token } = useAuth()

  useEffect(() => {
    fetchViewers()
  }, [])

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    )
    return formattedDate
  }

  const fetchViewers = async () => {
    try {
      const response = await fetch(
        "http://blogapp-pi-six.vercel.app/api/auth/getprofileviewers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setViews(data.msg || [])
      } else {
        console.error("Failed to fetch profile views.")
        setError("Failed to fetch profile views.")
      }
    } catch (err) {
      console.log(err)
      setError("An error occurred while fetching profile views.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      {views.length === 0 ? (
        <div>No views available</div>
      ) : (
        views.map((item, index) => (
          <div
            key={index}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
            <StripCard userId = {item.userId} times = {formatDate(item.timestamp)} />
          </div>
        ))
      )}
      <ToastContainer />
    </>
  )
}

export default ProfileView
