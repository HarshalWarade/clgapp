import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import { NavLink, useParams } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import Navbar from "../components/Navbar";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FollowingBlogs from "../components/FollowingBlogs";
import LatestNews from "../components/LatestNews";

const AuthHome = () => {
  const [followingsSize, setFollowingsSize] = useState(0);
  const { isDarkMode } = useContext(DarkModeContext);
  const { user, token } = useAuth();
  const id = user._id;
  const getfollowinglength = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/getfollowinglength/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch followings count");
      }

      const data = await response.json();

      if (!data || typeof data.data !== "number") {
        throw new Error("Invalid response format");
      }

      const followingsCount = data.data;
      setFollowingsSize(followingsCount);

      console.log("all set!");
    } catch (error) {
      console.error("Error fetching followings count:", error);
    }
  };

  useEffect(() => {
    getfollowinglength();
  }, []);

  setTimeout(() => {
    getfollowinglength();
  }, 2000);

  return (
    <>
      <Navbar />
      <div
        className={`flex justify-center p-10 ${
          isDarkMode ? `bg-black` : `bg-gray-100`
        }`}
      >
        <div className={`grid grid-cols-[1fr_2fr_1fr] w-full lg:px-36 gap-4`}>
          <div
            className={`h-min rounded-lg shadow-sm px-7`}
            style={
              isDarkMode ? { background: "#1B1F23" } : { background: "#FFFFFF" }
            }
          >
            <div
              className={`flex flex-col items-center justify-center gap-8 py-6`}
            >
              <img
                src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="
                className="w-16 h-auto rounded-full"
                alt=""
              />
              <div
                className={`flex gap-2 items-center justify-center flex-col`}
              >
                <h1
                  className={`text-xl font-bold ${
                    isDarkMode ? `text-slate-100` : `text-black`
                  }`}
                >
                  {user.firstName} {user.lastName}
                </h1>
                <p
                  className={`text-sm ${
                    isDarkMode ? `text-slate-300` : `text-black`
                  }`}
                >
                  {user.bio}
                </p>
              </div>
              <div
                className={`flex border-t-2 flex-col gap-2 items-start mr-auto justify-start w-full py-6 border-b-2`}
              >
                <p
                  className={`${isDarkMode ? `text-slate-200` : `text-black`}`}
                >
                  Profile Views:{" "}
                  <NavLink
                    className={`font-semibold ${
                      isDarkMode ? "text-blue-500" : "text-blue-600"
                    }`}
                  >
                    1.5M
                  </NavLink>
                </p>
                <p
                  className={`${isDarkMode ? `text-slate-200` : `text-black`}`}
                >
                  Post Impressions:{" "}
                  <NavLink
                    className={`font-semibold ${
                      isDarkMode ? "text-blue-500" : "text-blue-600"
                    }`}
                  >
                    3.7M
                  </NavLink>
                </p>
              </div>
              <div className={`w-full`}>
                <NavLink
                  className={`flex gap-3 items-center justify-center ${
                    isDarkMode ? `text-slate-200` : `text-black`
                  }`}
                >
                  Check Saved Items
                  <i className="fa-sharp fa-regular fa-bookmark"></i>
                </NavLink>
              </div>
              <div className={`w-full`}>
                <NavLink
                  className={`flex gap-3 items-center justify-center ${
                    isDarkMode ? `text-slate-200` : `text-black`
                  }`}
                >
                  Discover More
                </NavLink>
              </div>
            </div>
          </div>
          <div
            className={`rounded-lg shadow-sm ${isDarkMode ? `` : `bg-white`}`}
          >
            <div>
              {followingsSize === 0 ? (
                <div className="flex items-center justify-center content-center">
                  <div
                    className={`flex flex-col gap-4 text-lg font-semibold ${
                      isDarkMode ? "" : "text-slate-600"
                    }`}
                  >
                    <p>
                      You'll see posts, and actions from the users you follow!
                    </p>
                    <p>Kindly, begin with following some accounts!</p>
                  </div>
                </div>
              ) : (
                <div className={`${isDarkMode ? "" : "bg-gray-100"}`}>
                  <FollowingBlogs />
                </div>
              )}
            </div>
          </div>
          <div
            className={`rounded-md ${isDarkMode ? "text-slate-300" : "bg-gray-100 text-black"}`}
            style={
              isDarkMode ? { background: "#000" } : { background: "" }
            }
          >
            <LatestNews />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthHome;
