import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <nav className="border border-b-1 sm:flex border-slate-500 md:flex md:items-center md:justify-evenly h-auto py-4">
        <div>
          <h1 className="text-2xl font-bold">
            Colidea <i className="fa-solid fa-objects-column"></i>
          </h1>
        </div>
        <div className="flex gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-600"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-600"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/relax"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-600"}`
            }
          >
            Subscription
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-600"}`
            }
          >
            Contact
          </NavLink>
        </div>

        {isLoggedIn ? (
          <NavLink to="/logout">LogOut</NavLink>
        ) : (
          <div className="flex items-center content-center justify-center  gap-7">
            <NavLink
              to="/login"
              className={() =>
                `flex items-center content-center justify-center bg-orange-500 p-2 rounded-md text-white`
              }
            >
              LogIn
            </NavLink>
            <NavLink to="/getStarted">Get Started</NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
