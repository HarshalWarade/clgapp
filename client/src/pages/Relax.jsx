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

const Relax = () => {
  const [createBlog, setCreateBlog] = useState(false);
  const { user } = useAuth();
  const { isDarkMode } = useContext(DarkModeContext);
  
  
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
              <div className="flex gap-5">
                <NavLink
                  className={`text-blue-500 font-semibold hover:underline`}
                >
                  0 followers
                </NavLink>
                <NavLink
                  className={`text-blue-500 font-semibold hover:underline`}
                >
                  0 followings
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
                <NavLink
                  className={`border border-sky-600/75 text-sky-600/75 py-2 px-3 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? `hover:bg-sky-500/75 hover:text-white`
                      : `hover:bg-sky-100/75`
                  }`}
                  to={`/explore`}
                >
                  Explore
                </NavLink>
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
                isDarkMode ? "text-slate-400" : ""
              }`}
            >
              {user.college}
            </div>
          </div>
        </div>

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
            className={`flex justify-between text-slate-500 ${
              isDarkMode ? `` : `text-slate-500`
            }`}
          >
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              omnis obcaecati perspiciatis ipsam quae sapiente aspernatur minima
              harum voluptatem eos?
            </p>
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
              <ul className="flex flex-wrap list-disc gap-3 justify-between">
                <li>Something</li>
                <li>Something</li>
                <li>Something</li>
                <li>Something</li>
                <li>Something</li>
                <li>Something</li>
              </ul>
            </div>
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
    </>
  );
};

export default Relax;
