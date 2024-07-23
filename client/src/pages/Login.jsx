import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import { Navigate, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, storeTokenInStorage } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isLoggedIn) {
      toast.success(
        <NavLink to="/relax">
          Login Successful. Click on this message to enter Colidea platform
        </NavLink>,
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
      setUser({ email: "", password: "" });
    } else {
      toast.info("Please fill this form to continue", {
        position: "top-right",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isLoggedIn]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://blogapp-pi-six.vercel.app/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInStorage(res_data.token);
        location.reload();

        navigate("/relax");
      } else {
        toast.error("Failed to login, try again with correct credentials!", {
          position: "top-right",
          autoClose: 12000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-1/3 mx-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">
              Welcome Back! Please log in
            </h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="flex gap-5 items-center content-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Log In
                </button>
                <NavLink to={"/getStarted"} className={`bg-blue-100 p-2 rounded-md border border-blue-600 text-blue-600`}>New to Colidea</NavLink>
              </div>
            </form>
          </div>
        </div>
r
        <div className="bg-gray-50 p-6 rounded-md shadow-md ml-4">
          <h2 className="text-xl font-semibold mb-4">Hello, Welcome Back</h2>
          <p className="text-gray-700">
            We recommend logging in again to secure your account and maintain
            security policies.
          </p>
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

export default Login;
