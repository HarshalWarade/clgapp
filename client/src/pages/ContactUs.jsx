import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import { NavLink, Navigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ContactUs = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const {user} = useAuth()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.username != user.username) {
      toast.error("Please use the same username which was used to create this account", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
    if(formData.email != user.email) {
      toast.error("Please use the same email which was used to create this account", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
    try {
      if (isLoggedIn) {
        const response = await fetch(
          `http://localhost:3000/api/auth/requestcontact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          toast.success("Message was sent successfully to the team!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFormData({
            username: "",
            email: "",
            message: "",
          });
        } else {
          toast.warning("Failed to send message, this is an issue from our side! Try after some time, we're sorry for this.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("You must be logged in with your credentials first to make contact with the admins!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          username: "",
          email: "",
          message: "",
        });
        return;
      }

    } catch (err) {
      console.log("error at sending contact form: ", err);
    }
  };
  const {isDarkMode} = useContext(DarkModeContext)

  return (

    <>
      <Navbar />
      {isLoggedIn ? (
        <div className={`h-screen flex justify-center items-center ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className={`flex flex-col items-center justify-center w-full content-center max-w-md mx-auto mt-10 p-6 mb-10 rounded-md ${isDarkMode ? "bg-slate-700" : "bg-white"}`}>
            <h2 className={`text-2xl mb-4 w-auto font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Contact Us</h2>
            <form onSubmit={handleSubmit} className={`w-full ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
              <label className="flex items-center justify-center content-center gap-3 mb-4">
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input mt-1 border border-gray-200 outline-none pl-2 h-10 rounded-md block w-full ${isDarkMode ? "bg-slate-600 text-slate-300 border-none": "bg-white"}`}
                  autoComplete="off"
                  required
                />
              </label>
              <label className="flex items-center justify-center content-center gap-3 mb-4">
                <p className="">Email:</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input mt-1 border border-gray-200 outline-none pl-2 h-10 rounded-md block w-full ${isDarkMode ? "bg-slate-600 text-slate-300 border-none": "bg-white"}`}
                  autoComplete="off"
                  required
                />
              </label>
              <label className="block mb-4">
                Message:
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea p-3 h-40 border border-gray-200 outline-none rounded-md mt-1 block w-full ${isDarkMode ? "bg-slate-600 border-none" : "bg-white"}`}
                  autoComplete="off"
                  required
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col gap-10 items-center justify-center content-center">
            <p className="text-3xl font-semibold">You must be <span className="text-red-600">logged in</span> to use this functionality</p>
            <NavLink to='/login' className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Click to login</NavLink>
        </div>
      )}
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
      />
    </>
  );
};

export default ContactUs;
