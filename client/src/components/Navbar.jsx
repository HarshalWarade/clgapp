import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import DarkSwitch from "../pages/DarkSwitch";
import { DarkModeContext } from "../context/DarkModeContext";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <nav
        className={`sm:flex border-slate-500 md:flex md:items-center md:justify-evenly h-auto py-4 ${
          isDarkMode ? `border-none` : `bg-white`
        }`}
        style={isDarkMode ? { background: "#1B1F23" } : {}}
      >
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? `text-gray-400` : ``
            }`}
          >
            Colidea <i className="fa-solid fa-objects-column"></i>
          </h1>
        </div>

        <div className="flex gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-500"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-500"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/relax"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-500"}`
            }
          >
            Profile
          </NavLink>
          
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-500"}`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "text-orange-600 font-bold" : "text-gray-500"}`
            }
          >
            Contact
          </NavLink>
        </div>
        <DarkSwitch />
      </nav>
    </>
  );
};

export default Navbar;
