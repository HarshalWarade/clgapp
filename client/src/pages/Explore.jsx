import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../store/auth";
import { DarkModeContext } from "../context/DarkModeContext";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const { user, token } = useAuth();
  const { isDarkMode } = useContext(DarkModeContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/getallusers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.data.filter((u) => u._id !== user._id);
          setUsers(filteredUsers);
        } else {
          console.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch is completed
      }
    };

    fetchUsers();
  }, [token, user._id]); // Include token and user ID in the dependency array

  const handleRedirect = async (userID) => {
    const response = await fetch(
      `http://localhost:3000/api/auth/viewprofile/${userID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      navigate(`/profile/${userID}`); // Use navigate function to navigate programmatically
    } else {
      toast.error("Fetching failed!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const inProgress = () => {
    toast.info("Still in progress 🙂😎", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <Navbar />
      {loading ? ( // Conditional rendering based on loading state
        <div className="flex items-center justify-center content-center min-h-screen">
          <img
            src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
            alt="loading..."
          />
        </div>
      ) : (
        <div
          className={`min-h-screen gap-10 flex flex-col items-center py-10 px-10 text-slate-500 ${
            isDarkMode ? "bg-black" : "bg-gray-100"
          }`}
        >
          <h1
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Hi {user.firstName}, connect with people you know!
          </h1>
          <div className={`flex gap-10 flex-wrap ${isDarkMode ? "" : ""}`}>
            {users.map((user) => (
              <div
                className={`flex w-max p-5 rounded-md flex-col gap-5 items-center content-center justify-center bg-white ${
                  isDarkMode ? "" : ""
                }`}
                key={user._id}
              >
                <i className="fa-light bg-orange-100 p-8 rounded-full fa-user text-5xl"></i>
                <p className="text-2xl font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p>@{user.username}</p>
                <div className="flex flex-wrap gap-5">
                  <button
                    className={`bg-orange-600 text-white px-3 py-2 rounded-md`}
                    onClick={() => handleRedirect(user._id)}
                  >
                    Visit Profile
                  </button>
                  <button
                    className={`border border-blue-600 text-blue-600 bg-blue-50 px-3 py-2 rounded-md`}
                    onClick={inProgress}
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
      />
    </>
  );
};

export default Explore;
