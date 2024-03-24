import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import Footer from "../components/Footer";
import CreativeCard from "../components/CreativeCard";
import { NavLink } from "react-router-dom";
import DarkSwitch from "./DarkSwitch";
import { DarkModeContext } from "../context/DarkModeContext";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../components/TextEditor";
import PostCount from "../components/PostCount";
import FetchPosts from "../components/FetchPosts";

const Relax = () => {

  const [createBlog, setCreateBlog] = useState(false)

  const toggleCreateBlog = () => {
    setCreateBlog(!createBlog)
  }

  const closeDialogue = () => {
    setCreateBlog(false)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createBlog && !document.getElementById("text-editor").contains(event.target)) {
        setCreateBlog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [createBlog]);

  const { user } = useAuth();

  const { isDarkMode } = useContext(DarkModeContext);

  console.log("Dark mode state: ", isDarkMode);

  return (
    <>
      {/* <nav
        className={`sm:flex border-slate-500 md:flex md:items-center md:justify-evenly h-auto py-4 ${
          isDarkMode ? `bg-slate-900 border-none` : `bg-white`
        }`}
      >
        <div>
          <h1
            className={`text-2xl font-bold ${isDarkMode ? `text-gray-400` : ``}`}
          >
            Colidea <i className="fa-solid fa-objects-column"></i>
          </h1>
        </div>

        <div className="flex gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-sky-600/75 font-bold" : "text-gray-500"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "text-sky-600/75 font-bold" : "text-gray-500"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/relax"
            className={({ isActive }) =>
              `${isActive ? "text-sky-600/75 font-bold" : "text-gray-500"}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "text-sky-600/75 font-bold" : "text-gray-500"}`
            }
          >
            Contact
          </NavLink>
        </div>
        <DarkSwitch />
      </nav> */}
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
                  isDarkMode ? `text-gray-400` : `text-gray-700`
                }`}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
                pariatur minus rem recusandae inventore exercitationem aliquid
                omnis laudantium. Commodi, harum.
              </p>
              <NavLink
                className={`text-blue-500 font-semibold hover:underline`}
              >
                500+ peers
              </NavLink>
              <div className="relative flex items-center content-center gap-12">
                <NavLink
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
                >
                  Public View
                </NavLink>
                <NavLink
                  className={`border border-sky-600/75 text-sky-600/75 py-2 px-3 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? `hover:bg-sky-500/75 hover:text-white`
                      : `hover:bg-sky-100/75`
                  }`}
                >
                  More
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

            <div className="flex justify-evenly w-full px-6 text-slate-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, similique!
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
            <FetchPosts/>
          </div>
          <div className={`${createBlog ? "block" : "hidden"}`} id="text-editor">
            
            <TextEditor closeDialogue={closeDialogue}  />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Relax;
