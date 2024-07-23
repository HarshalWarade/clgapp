import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../store/auth"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
  const navigate = useNavigate()

  // initial stages bandiye.. later edit krnaar...
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  })

  const { storeTokenInStorage } = useAuth()

  // handling inputs -> using by default event
  const handleInput = (e) => {
    // e.preventDefault() // -> for submission only... field saathi naste
    let name = e.target.name
    let value = e.target.value
    // console.log(value)
    setUser({
      ...user,
      [name]: value,
    })
  }

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(user)

    // send data to server
    try {
      const response = await fetch(`http://blogapp-pi-six.vercel.app/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      if (response.ok) {
        toast.success(
          "Registered Successfully! You'll be naviagted to login page within 12 seconds.",
          {
            position: "top-right",
            autoClose: 12000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
        const res_data = await response.json()
        console.log("Response from the server: ", res_data)

        storeTokenInStorage(res_data.token)

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          username: "",
        })
        setTimeout(() => {
          navigate("/login")
        }, 12000)
      }

      // console.log(response)
    } catch (error) {
      console.log("Registration server error: ", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-1/3 mx-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Registration Form</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="flex items-center content-center gap-5">
                <button
                  type="submit"
                  className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 focus:outline-none"
                >
                  Register
                </button>
                <NavLink className={`text-blue-500 underline`} to={`/login`}>
                  Already a user
                </NavLink>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-md shadow-md ml-4">
          <h2 className="text-xl font-semibold mb-4">Why Register?</h2>
          <p className="text-gray-700">
            Register to connect with the website and unlock exclusive features.
            Join our community today!
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={12000}
        hideProgressBar={false}
      />
    </>
  )
}

export default Register
