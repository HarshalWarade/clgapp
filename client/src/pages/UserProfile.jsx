import React, { useState, useEffect, useContext } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useAuth } from "../store/auth"
import Navbar from "../components/Navbar"
import { DarkModeContext } from "../context/DarkModeContext"
import ImgCard from "../components/ImgCard"
import PostCard from "../components/PostCard"

const UserProfile = () => {
  const { isDarkMode } = useContext(DarkModeContext)
  const { token, user } = useAuth()
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options)
    return formattedDate
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch(
          `http://localhost:3000/api/auth/viewprofile/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          setUserData(profileData.data)
        } else {
          setError("Failed to fetch user profile.")
        }

        const postsResponse = await fetch(
          `http://localhost:3000/api/auth/getblogs/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          setUserPosts(postsData.data)
        } else {
          setError("Failed to fetch user posts.")
        }
      } catch (error) {
        console.log(error)
        setError("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, token])

  const loadingContent = (
    <div className="flex flex-col gap-5 items-center justify-center content-center min-h-screen"
      style={{background: "#000000"}}
    >
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/1*okbBhXU2x0f_eFyUVyc-gA.gif"
        alt="loading..."
      />
      {/* <h1 className="text-3xl text-white">Loading... Please Wait</h1> */}
    </div>
  )

  const errorContent = <div>Error: {error}</div>

  if (loading) {
    return loadingContent
  }

  if (error) {
    return errorContent
  }

  if (!userData) {
    return <div>User not found.</div>
  }

  const userContent = (
    <>
      <Navbar />
      <div className={`flex flex-col gap-5 py-10 ${isDarkMode ? "bg-black" : "bg-white"} min-h-screen`}>
        <div
          className={`w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-gray-100"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div className={`flex items-center content-center gap-10`}>
            <i
              className={`fa-light fa-user text-6xl p-8 rounded-full ${
                isDarkMode ? `bg-indigo-200 text-black` : `bg-sky-200/75`
              }`}
            ></i>
            <p className={`flex flex-col gap-5 text-2xl font-semibold`}>
              <p className={`${isDarkMode ? "text-slate-100" : ""}`}>
                {userData.firstName} {userData.lastName}
              </p>
              <p className={`text-xl ${isDarkMode ? "text-slate-300" : ""}`}>
                @{userData.username}
              </p>
              {userData.bio ? <p className={`text-sm ${isDarkMode ? "text-slate-200" : ""}`}>{userData.bio}</p> : <p className={`text-sm ${isDarkMode ? "text-slate-200" : ""}`}>No bio</p>}
            </p>
          </div>
        </div>
        
        
        <div
          className={`flex flex-col gap-3 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-gray-100"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-200" : ""}`}>About</h2>
          <p className={`text-justify ${isDarkMode ? "text-slate-300" : ""}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aperiam ipsum esse eius labore dignissimos unde illum corporis, at sequi magni in quisquam nobis commodi placeat earum eveniet, mollitia recusandae consequuntur rerum voluptates quaerat quod veritatis. Laboriosam eos qui neque.</p>
        </div>


        <div
          className={`flex flex-col overflow-x-hidden gap-5 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-gray-100"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-200" : ""}`}>Featured</h2>
          <div className="grid grid-cols-3 gap-6">
            <ImgCard img="https://assets.leetcode.com/users/harshalwarade/avatar_1708405944.png" heading="Harshal LeetCode" content="Hello I'm Harshal Warade and this is my leetcode account where I usually solve DSA questions, thank you." link="https://leetcode.com/harshalwarade/" />
            <ImgCard img="https://assets.leetcode.com/users/avatars/avatar_1690568151.png" heading="Jay Gite LeetCode" content="Hello I'm Jay Gite and this is my leetcode account where I usually solve DSA questions, thank you." link="https://leetcode.com/jaygite/" />
            <ImgCard img="https://assets.leetcode.com/users/avatars/avatar_1686510800.png" heading="Swakshan LeetCode" content="Hello I'm Swakshan and this is my leetcode account where I usually solve DSA questions, thank you." link="https://leetcode.com/swakshan/" />
          </div>
        </div>




        <div
          className={`flex flex-col gap-5 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-gray-100"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-200" : ""}`}>User Posts</h2>
          <div className={`grid grid-cols-3 gap-3`}>
            {userPosts.map((post) => (
              <PostCard key={post._id} title={post.title} category={post.category} timing={formatDate(post.blogCreatedAt)} content={post.content} />
            ))}
          </div>
        </div>
      </div>
    </>
  )

  return userContent
}

export default UserProfile
