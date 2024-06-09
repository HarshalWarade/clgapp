import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import Navbar from "../components/Navbar";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../components/TextEditor";
import PostCount from "../components/PostCount";
import FetchPosts from "../components/FetchPosts";
import Featured from "./Featured";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Comment from "./Comment";
import AboutLine from "../components/AboutLine";
// import0om "../components0// import FollowingsLength from "../components/FollowingsLength";
// import M0om "../components/M0
const Relax = () => {
  // console.log(user)
  // *********************** MUST DELETE IN PRODUCTION *************************
  const { token } = useAuth();

  const delAccount = async () => {
    const response = await fetch(
      `http://localhost:3000/api/auth/remyaccount/${user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      toast.success("Please fill this form to continue", {
        position: "top-right",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("Failed to delete account!");
    }
  };

  // ****************************************************************************************

  const [createBlog, setCreateBlog] = useState(false);
  const { user } = useAuth();
  const { isDarkMode } = useContext(DarkModeContext);
  const [showFeatured, setShowFeatured] = useState(false);

  let id = user._id
  // console.log(id)

  const [followersSize, setFollowersSize] = useState(0)
  const [followingsSize, setFollowingsSize] = useState(0)

  const getFollowersLength = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/getfollowerslength/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Green Flag from st 1")
      } else {
        throw new Error('Failed to fetch followers count');
      }

      const data = await response.json();

      if (!data || typeof data.data !== 'number') {
        throw new Error('Invalid response format');
      }

      const followersCount = data.data;
      // console.log('Followers count:', followersCount);
      setFollowersSize(followersCount);
    } catch (error) {
      console.error('Error fetching followers count:', error);
      // alert("Close the application, it's crashing!");
    }
  }

  useEffect(() => {
    getFollowersLength();
  }, [id]);

  const getfollowinglength = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/getfollowinglength/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        console.log("Green flag from st 2")
      } else {
        throw new Error('Failed to fetch followings count')
      }

      const data = await response.json()

      if (!data || typeof data.data !== 'number') {
        throw new Error('Invalid response format')
      }

      const followingsCount = data.data
      // console.log('Followers count:', followingsCount)
      setFollowingsSize(followingsCount)
    } catch (error) {
      console.error('Error fetching followings count:', error)
      // alert("Close the application, it's crashing!")
    }
  }

  useEffect(() => {
    getfollowinglength()
  }, [id])
  

  const handleadminfirst = () => {
    toast.info("We're building this section, you must wait for around a year to use this feature! Oh! Damn.", {
      position: "top-right",
      autoClose: 12000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const toggleCreateBlog = () => {
    setCreateBlog(!createBlog);
  };

  const closeDialogue = () => {
    setCreateBlog(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createBlog &&
        !document.getElementById("text-editor").contains(event.target)
      ) {
        setCreateBlog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [createBlog]);

  return (
    <>
      <Navbar />
      <div className={`py-9 px-20 ${isDarkMode ? `bg-black` : `bg-gray-100`}`}>
        <div
          className={`flex shadow-sm rounded-lg justify-evenly mb-5 px-6 h-auto py-9 ${
            isDarkMode ? `text-white` : "bg-white text-black"
          }`}
          style={isDarkMode ? { background: "#1D2226" } : {}}
        >
          <div className="flex items-center content-center justify-center gap-8 flex-1">
            <i
              className={`fa-light fa-user text-6xl p-8 flex items-center content-center justify-center rounded-full ${
                isDarkMode ? `bg-indigo-200 text-black` : `bg-sky-200/75`
              }`}
            ></i>
            <div className="flex flex-col gap-3">
              <h2
                className={`text-2xl flex gap-3 items-center  content-center font-semibold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {user.firstName} {user.lastName}{" "}
                <p
                  className={`text-xl ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  @{user.username}
                </p>
              </h2>
              <p
                className={`text-md text-justify ${
                  isDarkMode ? `text-gray-300` : `text-gray-700`
                }`}
              >
                {user.bio}
              </p>
              <div className="flex py-4 justify-between">
                <NavLink
                  className={`text-blue-500 font-semibold hover:underline`}
                >
                <p className="flex flex-col items-center justify-center content-center"><b className={`text-2xl font-normal`}>{followersSize}</b> followers</p>
                </NavLink>
                <NavLink
                  className={`text-blue-500 font-semibold hover:underline`}
                >
                <p className="flex flex-col items-center justify-center content-center"><b className={`text-2xl font-normal`}>{followingsSize}</b> followings</p>
                </NavLink>
              </div>
              <div className="relative flex items-center content-center gap-12">
                <NavLink
                  to={`/settings`}
                  className={`bg-sky-500/75 text-white py-2 px-3 flex items-center justify-center rounded-full hover:bg-sky-600/75`}
                >
                  Settings
                </NavLink>
                <NavLink
                  className={`border border-sky-600/75 text-sky-600/75 py-2 px-3 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? `hover:bg-sky-500/75 hover:text-white`
                      : `hover:bg-sky-100/75`
                  }`}
                  to={`http://localhost:5173/profile/${user._id}`}
                >
                  Public View
                </NavLink>
                {/* <NavLink
                  className={`border border-sky-600/75 text-sky-600/75 py-2 px-3 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? `hover:bg-sky-500/75 hover:text-white`
                      : `hover:bg-sky-100/75`
                  }`}
                  to={`/explore`}
                >
                  Explore
                </NavLink>
                <NavLink className={`bg-red-600 rounded-md p-2`}>Get Followers Count</NavLink> */}
                {/* {user.isadmin ? "" : <button onClick={delAccount}>Del Account</button>} */}
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col items-center gap-7 content-center justify-center flex-1 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <h1 className="text-xl"></h1>

            <div
              className={`flex justify-evenly w-full px-6 ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {user.college ? (
                <div className="flex items-center justify-center content-center gap-3">
                  <i className="text-xl fa-regular fa-school-circle-check"></i>
                  <div>{user.college}</div>
                </div>
              ) : (
                <div>
                  <p>
                    <i className="fa-sharp fa-solid fa-school-circle-xmark"></i>{" "}
                    Please choose you college from the settings page!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {user.isadmin ? (
          <>
            <div
              className={`mb-5 shadow-sm mt-5 px-6 py-9 rounded-md ${
                isDarkMode ? `` : `bg-white`
              }`}
              style={isDarkMode ? { background: "#1B1F23" } : {}}
            >
              <div className="flex flex-col gap-5">
                <h2
                  className={`text-xl font-semibold ${
                    isDarkMode ? `text-slate-200` : `text-slate-800`
                  }`}
                >
                  Admin Features
                </h2>
                <div className="flex gap-5 items-center content-center justify-center">
                  <button className={`${isDarkMode ? "text-slate-200 bg-sky-600 p-2 rounded-md hover:bg-sky-700" : "p-2 rounded-md bg-gray-400 text-white"}`} onClick={() => handleadminfirst()}>View all accounts</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div
          className={`mb-5 shadow-sm mt-5 px-6 py-9 rounded-md ${
            isDarkMode ? `` : `bg-white`
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div>
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? `text-slate-200` : `text-slate-800`
              }`}
            >
              Analytics
            </h2>
            <p
              className={`text-sm font-light ${
                isDarkMode ? `text-slate-400` : ``
              }`}
            >
              Private to you
            </p>
          </div>
          <div className={`flex justify-between text-slate-400 pt-5`}>
            <div>
              <NavLink
                className={`text-xl font-semibold hover:underline ${
                  isDarkMode ? `text-slate-200` : `text-slate-700`
                }`}
              >
                190 profile views
              </NavLink>
              <p
                className={`${
                  isDarkMode ? `text-slate-400` : `text-slate-500`
                }`}
              >
                Check who checked your profile.
              </p>
            </div>
            <div>
              <NavLink
                className={`text-xl font-semibold hover:underline ${
                  isDarkMode ? `text-slate-200` : `text-slate-700`
                }`}
              >
                54 search results
              </NavLink>
              <p
                className={`${
                  isDarkMode ? `text-slate-400` : `text-slate-500`
                }`}
              >
                Check how many time you appeared in search results.
              </p>
            </div>
            <div>
              <NavLink
                className={`text-xl font-semibold hover:underline ${
                  isDarkMode ? `text-slate-200` : `text-slate-700`
                }`}
              >
                2376 post impressions
              </NavLink>
              <p
                className={`${
                  isDarkMode ? `text-slate-400` : `text-slate-500`
                }`}
              >
                Check out who's engaging with your posts.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex shadow-sm flex-col gap-3 mb-5 mt-5 px-6 py-9 rounded-md ${
            isDarkMode ? `` : `bg-white`
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div>
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? `text-slate-200` : `text-slate-800`
              }`}
            >
              About
            </h2>
          </div>
          <div
            className={`flex text-justify justify-between ${
              isDarkMode ? `text-slate-300` : `text-slate-500`
            }`}
          >
            <p><AboutLine /></p>
          </div>
          <div
            className={`border flex flex-col gap-5 mt-2 rounded-md text-slate-400 p-5 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h1 className={`text-slate-500 font-semibold`}>
              Top Skills <i className="fa-regular fa-gem"></i>
            </h1>
            <div className={`px-5`}>
              {user.skills && user.skills.length > 0 ? (
                <ul className="flex flex-wrap list-disc gap-3 justify-between">
                  {user.skills.map((skill, index) =>
                    skill
                      .split(" ")
                      .map((word, wordIndex) => (
                        <li key={index * 100 + wordIndex}>{word}</li>
                      ))
                  )}
                </ul>
              ) : (
                <p>No skills available</p>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex shadow-sm flex-col gap-3 mb-5 mt-5 px-6 py-9 rounded-md ${
            isDarkMode ? `` : `bg-white`
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div className="flex justify-between">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? `text-slate-200` : `text-slate-800`
              }`}
            >
              Featured
            </h2>
            <div
              className={`flex text-justify justify-between ${
                isDarkMode ? `text-slate-300` : `text-slate-500`
              }`}
            >
              <button onClick={() => setShowFeatured(!showFeatured)}>
                {showFeatured ? "Close Featured" : "Add Featured"}
              </button>
              {showFeatured ? <Featured /> : ""}
            </div>
          </div>
          <div className="text-slate-200">
            {user.featured ? (
              <div className="flex flex-wrap gap-5">
                {user.featured.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      isDarkMode ? "border border-gray-700" : "border"
                    } rounded-md p-4 mb-4 flex flex-col gap-3 items-center`}
                  >
                    <img
                      src={item.imageUrl}
                      alt="Featured"
                      className="mb-2 rounded-md h-36 w-auto"
                    />
                    <h4
                      className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      {item.heading}
                    </h4>
                    <p
                      className={`mb-2 ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      {item.content}
                    </p>
                    <a
                      href={item.visitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 w-full text-white flex items-center content-center justify-center p-2 rounded-md hover:bg-blue-600"
                    >
                      Visit Link
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              "You haven't featured anything yet!"
            )}
          </div>
        </div>

        <div
          className={`flex shadow-sm flex-col gap-3 mb-5 mt-5 px-6 py-9 rounded-md ${
            isDarkMode ? `` : `bg-white`
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? `text-slate-200` : `text-slate-800`
              }`}
            >
              Posts: <PostCount />
            </h2>
            <div className="flex items-center gap-5">
              <button
                className={`${
                  isDarkMode
                    ? "bg-white"
                    : "border border-sky-500 bg-sky-100 text-sky-500 hover:bg-sky-200"
                } p-2 rounded-md`}
                onClick={toggleCreateBlog}
              >
                Create Post
              </button>
              <div>
                <i
                  className={`fa-sharp fa-light fa-pen cursor-pointer ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                ></i>
              </div>
            </div>
          </div>
          <div id="posts" className="text-slate-300">
            <FetchPosts />
          </div>
          <div
            className={`${createBlog ? "block" : "hidden"}`}
            id="text-editor"
          >
            <TextEditor closeDialogue={closeDialogue} />
          </div>
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

export default Relax;
