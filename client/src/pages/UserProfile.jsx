import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import { DarkModeContext } from "../context/DarkModeContext";

const UserProfile = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { token, user } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUserData(profileData.data);
        } else {
          setError("Failed to fetch user profile.");
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
        );

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setUserPosts(postsData.data);
        } else {
          setError("Failed to fetch user posts.");
        }
      } catch (error) {
        console.log(error);
        setError("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const loadingContent = (
    <div className="flex items-center justify-center content-center min-h-screen">
      <img
        src="https://cdn.dribbble.com/users/2015153/screenshots/6592242/progess-bar2.gif"
        alt="loading..."
      />
    </div>
  );

  const errorContent = <div>Error: {error}</div>;

  if (loading) {
    return loadingContent;
  }

  if (error) {
    return errorContent;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  const userContent = (
    <>
      <Navbar />
      <div
        className={`w-3/4 py-10 rounded-md px-10 mx-auto ${
          isDarkMode ? "bg-black" : "bg-gray-100"
        }`}
      >
        <div className={`flex items-center content-center gap-10`}>
          <i
            className={`fa-light fa-user text-6xl p-8 rounded-full ${
              isDarkMode ? `bg-indigo-200 text-black` : `bg-sky-200/75`
            }`}
          ></i>
          <p className={`flex flex-col gap-5 text-2xl font-semibold`}>
            <p>
              {userData.firstName} {userData.lastName}
            </p>
            <p className={`text-sm`}>@{userData.username}</p>
            <p>{userData.bio}</p>
          </p>
        </div>
        <h2 className="text-xl font-semibold">User Posts</h2>
        <ul>

          {userPosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <div
                className="oxygen-mono-regular"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return userContent;
};

export default UserProfile;
