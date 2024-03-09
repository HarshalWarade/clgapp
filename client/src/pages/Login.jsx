import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
const Login = () => {
  // initial stages bandiye.. later edit krnaar...
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {storeTokenInStorage} = useAuth()

  // handling inputs -> using by default event
  const handleInput = (e) => {
    // e.preventDefault() // -> for submission only... field saathi naste
    let name = e.target.name;
    let value = e.target.value;
    // console.log(value)
    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Login Successful");
        location.reload()
        // storing token in the local storage
        const res_data = await response.json()
        storeTokenInStorage(res_data.token);
        setUser({
          email: "",
          password: "",
        });
      } else {
        alert("Failed to login, try again with correct credentials!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* Registration Form */}
        <div className="w-1/3 mx-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">
              Welcome Back ! Please log in
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

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Log In
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 rounded-md shadow-md ml-4">
          <h2 className="text-xl font-semibold mb-4">Hello, Welcome Back</h2>
          <p className="text-gray-700">
            We recommend log in again to secure your account, and maintain the
            policies of security.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
