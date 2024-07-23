import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";
const PostCard = (prop) => {
  const [likeCounts, setLikeCounts] = useState(0);
  const [author, setAuthor] = useState('The great Author')
  const [authorId, setAuthorId] = useState(0)
  const [isLiked, setIsLiked] = useState(false);
  const { token } = useAuth();
  const replaceCodeWithStyled = (content) => {
    const codeRegex = /!!!!(.*?)!!!!/gs;
    return content.replace(codeRegex, (match, code) => {
      return `<code class="consolas">${code}</code>`;
    });
  };

  const handleLikePost = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/like/${prop.postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCounts((prev) => prev + (isLiked ? -1 : 1));
        localStorage.setItem(prop.postId, JSON.stringify(!isLiked));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const likesCount = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/likescount/${prop.postId}`,
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
        setLikeCounts(data.data);
        const storedLikeStatus = JSON.parse(localStorage.getItem(prop.postId));
        if (storedLikeStatus !== null) {
          setIsLiked(storedLikeStatus);
        }
      }
    } catch (err) {
      console.error(`Error at likesCount -> FrontEnd ==> ${err}`);
    }
  };

  const whoisauthor = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/whoisauthor/${prop.postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.ok) {
        const data = await response.json()
        setAuthor(data.message)
        setAuthorId(data.authorId)
      }
    } catch (err) {
      console.log("Error in whoisauthor frontend: ", err)
    }
  }

  useEffect(() => {
    likesCount();
    whoisauthor();
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <div
        className={`mb-3 flex h-min p-5 rounded-md ${
          isDarkMode ? "text-slate-200" : "bg-white"
        } flex-col gap-5`}
        style={isDarkMode ? { background: "#1D2226" } : {}}
      >
        <h1
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-slate-100" : ""
          }`}
        >
          {prop.title}
        </h1>
        <div className="w-min">
          <NavLink to={`http://localhost:5173/profile/${authorId}`}><p className={`text-sm text-blue-500`}>@{author}</p></NavLink>
        </div>
        <div
          className={`${isDarkMode ? "text-slate-300" : "text-slate-500"}`}
          dangerouslySetInnerHTML={{
            __html: replaceCodeWithStyled(prop.content),
          }}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <p
          className={`text-sm font-semibold ${
            isDarkMode
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-200 text-gray-500"
          } w-max px-2 py-1 rounded-md `}
        >
          {prop.category}
        </p>
        <p
          className={`text-sm font-semibold ${
            isDarkMode ? "text-slate-600" : "text-slate-400"
          }`}
        >
          {prop.timing}
        </p>
        <p>{likeCounts === 1 ? "1 Like" : `${likeCounts} Likes`}</p>
        <div id="activities" className={`flex justify-between`}>
          <button
            onClick={handleLikePost}
            className={`${isLiked ? 'text-blue-500' : ''}`}
          >
            <i className={`fa-sharp fa-solid fa-heart ${isLiked ? "text-red-500" : "text-slate-300"}`}></i>
          </button>
          <button onClick={() => console.log('commented!')}>Comment</button>
        </div>
      </div>
    </>
  );
};

export default PostCard;
