import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import { DarkModeContext } from "../context/DarkModeContext";

const UserProfile = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { token, user } = useAuth();
  const { id } = useParams(); // Get the user ID from the route parameters
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
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
          setUserData(profileData.data); // Assuming the response contains user data
        } else {
          setError("Failed to fetch user profile.");
        }
      } catch (error) {
        console.log(error);
        setError("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
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
          setUserPosts(postsData.data); // Assuming the response contains user posts
        } else {
          setError("Failed to fetch user posts.");
        }
      } catch (error) {
        console.log(error);
        setError("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [id, token]); // Include id and token in the dependency array

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center content-center min-h-screen">
          <img
            src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
            alt="loading..."
          />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className={`min-h-screen py-10 px-10 ${isDarkMode ? "bg-black" : "bg-gray-100"}`}>
        <h1 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Profile of {userData.firstName} {userData.lastName}
        </h1>
        <p>{userData.email}</p>
        <h2 className="text-xl font-semibold">User Posts</h2>
        <ul>
          {userPosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <div className="oxygen-mono-regular" dangerouslySetInnerHTML={{ __html: post.content }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
