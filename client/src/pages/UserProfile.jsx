import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import { DarkModeContext } from "../context/DarkModeContext";
import ImgCard from "../components/ImgCard";
import PostCard from "../components/PostCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FollowersLength from "../components/FollowersLength";
// import FollowingsLength from "../components/FollowingsLength";

const UserProfile = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { token, user } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const currUser = useAuth()
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersSize, setFollowersSize] = useState(0)
  const [followingsSize, setFollowingsSize] = useState(0)

  const checkFollowingStatus = async () => {
    try {
      const response = await fetch(`http://blogapp-pi-six.vercel.app/api/auth/isfollowing/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if(response.ok) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    checkFollowingStatus();
  }, [id]);

  const getFollowersLength = async () => {
    try {
      const response = await fetch(`http://blogapp-pi-six.vercel.app/api/auth/getfollowerslength/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
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
      const response = await fetch(`http://blogapp-pi-six.vercel.app/api/auth/getfollowinglength/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
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
  }, [])

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/follow/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if(response.ok) {
        toast.success(data.message || "You're now following this account", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(data.message || "Failed to follow this account!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while trying to follow the account.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleUnfollow = async () => {
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/unfollow/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json()
      if(response.ok) {
        toast.success(data.message || "Unfollowed Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          location.reload()
        }, 2000);
      } else {
        toast.error(data.message || "Failed to unfollow this account!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error("Error from our side, we're fixing it right away!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Error at handle Unfollow function -> Frontend")
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch(
          `http://blogapp-pi-six.vercel.app/api/auth/viewprofile/${id}`,
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
          `http://blogapp-pi-six.vercel.app/api/auth/getblogs/${id}`,
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
    <div
      className="flex flex-col gap-5 items-center justify-center content-center min-h-screen"
      style={{ background: "#0C0C0C" }}
    >
      <img
        src="https://cdn.dribbble.com/users/121337/screenshots/1024835/loading2.gif"
        alt="loading..."
      />
      {/* <h1 className="text-3xl text-white">Loading... Please Wait</h1> */}
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
        className={`flex flex-col gap-5 py-10 ${
          isDarkMode ? "bg-black" : "bg-slate-100"
        } min-h-screen`}
      >
        <div
          className={`w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div className={`flex items-center content-center gap-10`}>
            <i
              className={`fa-light fa-user text-6xl p-8 rounded-full ${
                isDarkMode ? `bg-indigo-200 text-black` : `bg-sky-200/75`
              }`}
            ></i>
            <div className={`flex flex-col gap-5`}>
              <div className={`text-2xl font-semibold ${isDarkMode ? "text-slate-100" : ""}`}>
                {userData.firstName} {userData.lastName}
              </div>
              <div className={`flex justify-between`}>
                <div className={`flex items-center content-center justify-center flex-col`}>
                  <h1 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-100" : "text-black"}`}>{followersSize}</h1>
                  <h2 className={`${isDarkMode ? "text-slate-100" : "text-black"}`}>Followers</h2>
                </div>
                <div className={`flex items-center content-center justify-center flex-col`}>
                  <h1 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-100" : "text-black"}`}>{followingsSize}</h1>
                  <h2 className={`${isDarkMode ? "text-slate-100" : "text-black"}`}>Followings</h2>
                </div>
              </div>
              <div className={`w-min text-lg cursor-pointer ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>
                @{userData.username}
              </div>
              {userData.bio ? (
                <div className={`text-md ${isDarkMode ? "text-slate-200" : ""}`}>
                  {userData.bio}
                </div>
              ) : (
                <div className={`text-sm ${isDarkMode ? "text-slate-200" : ""}`}>
                  No bio
                </div>
              )}
            </div>
            <div
              className={`flex justify-evenly ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              <p>
                {userData.college ? (
                  <div className="flex gap-4">
                    <i className="text-xl fa-regular fa-school-circle-check"></i>
                    {userData.college}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <i className="fa-sharp fa-solid fa-school-circle-xmark"></i>
                    No college added
                  </div>
                )}
              </p>
            </div>
            {
              user._id === id 
              ? ""
              : (
                currUser._id === id 
                ? ''
                : (
                  <div>
                    {isFollowing ? 
                    (
                      <button 
                      onClick={() => handleUnfollow()} 
                      className={`p-3 rounded-md ${
                        isDarkMode 
                        ? "text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-gray-900" 
                        : "border border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-400 hover:text-slate-50"
                      }`}
                    >
                      Unfollow
                    </button>
                    )
                    : 
                    (
                      <button 
                      onClick={handleFollow} 
                      className={`p-3 rounded-md ${
                        isDarkMode 
                        ? "text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-gray-900" 
                        : "border border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-400 hover:text-slate-50"
                      }`}
                    >
                      Follow
                    </button>
                    )                    
                    }
                  </div>
                )
              )
            }

          </div>
        </div>

        <div
          className={`flex flex-col gap-3 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <h2
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-slate-200" : ""
            }`}
          >
            About
          </h2>
          <p className={`text-justify ${isDarkMode ? "text-slate-300" : ""}`}>
            {userData.about}
          </p>
        </div>

        <div
          className={`flex flex-col overflow-x-hidden gap-5 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <h2
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-slate-200" : ""
            }`}
          >
            Featured
          </h2>
          <div className="text-slate-200">
          {userData.featured ? (
              <div className="flex flex-wrap gap-5">
                {userData.featured.map((item, index) => (
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
              </div >
            ) : (
              "You haven't featured anything yet!"
            )}
          </div>
        </div>

        <div
          className={`flex flex-col gap-5 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <h2
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-slate-200" : ""
            }`}
          >
            User Posts
          </h2>
          <div className={`grid grid-cols-3 gap-3`}>
            {userPosts.map((post) => (
              <PostCard
                key={post._id}
                postId={post._id}
                title={post.title}
                category={post.category}
                timing={formatDate(post.blogCreatedAt)}
                content={post.content}
              />
            ))}
          </div>
        </div>

        <div
          className={`flex flex-col gap-5 w-3/4 py-10 rounded-md px-10 mx-auto ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
          style={isDarkMode ? { background: "#1B1F23" } : {}}
        >
          <div
            className={`border flex flex-col gap-5 mt-2 rounded-md text-slate-400 p-5 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-slate-200" : ""
              }`}
            >
              Skills
            </h2>
            <div className={`px-5`}>
              {userData.skills && userData.skills.length > 0 ? (
                <ul className="flex flex-wrap list-disc gap-3 justify-between">
                  {userData.skills.map((skill, index) =>
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
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
      />
    </>
  );

  return userContent;
};

export default UserProfile;
