import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { DarkModeContext } from "../context/DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
// import { CustomUserContext, CustomUserSetContext } from "../context/UserContext";

const SettingsPage = () => {
  // const customUser = useContext(CustomUserContext);
  // const setCustomUser = useContext(CustomUserSetContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const { user, token } = useAuth();
  const userId = user._id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    college: user.college || "",
    bio: user.bio || "",
    about: user.about || "",
    dob: user.dob || "",
    phone: user.phone || "",
    skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
  });

  useEffect(() => {
    toast.warning(
      "Please avoid refreshing this page as it will erase the form data. Also, refrain from saving empty changes, as the form will be updated with empty values.",
      {
        position: "top-right",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/settings/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Data updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/relax");
        }, 2000);
      } else {
        alert("Failed to update settings.");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`flex w-full py-10 items-center justify-center min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <div
          className={`w-full lg:w-2/3 xl:w-1/2 flex flex-col items-center bg-white rounded-md p-10 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          style={{ background: isDarkMode ? "#1B1F23" : "" }}
        >
          <h1 className="text-2xl font-semibold mb-5">Settings Page</h1>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-4">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="college">College:</label>
              <select
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              >
                <option value="">Select College</option>
                <option value="Prof. Ram Meghe College of Engineering and Management">
                  Prof. Ram Meghe College of Engineering and Management
                </option>
                <option value="Prof. Ram Meghe Institute of Technology and Research">
                  Prof. Ram Meghe Institute of Technology and Research
                </option>
                <option value="Sipna College of Engineering and Technology">
                  Sipna College of Engineering and Technology
                </option>
                <option value="P.R.Pote College of Engineering">
                  P.R.Pote College of Engineering
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className={`outline-none rounded-md h-max px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="about">About:</label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="skills">Skills:</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Add skills using space separation, ex. C++ Machine-Learning Web-Developer"
                autoComplete="off"
                className={`outline-none rounded-md px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100"
                }`}
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${
                isDarkMode ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              Save Settings
            </button>
            <NavLink
              to={"/relax"}
              className={`flex items-center justify-center content-center hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded-md ${
                isDarkMode ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              Go back
            </NavLink>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={12000}
        hideProgressBar={false}
      />
    </>
  );
};

export default SettingsPage;
