// DarkSwitch.jsx
import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const DarkSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <label
      htmlFor="darkModeSwitch"
      className="flex items-center cursor-pointer"
    >
      <div className="relative">
        <input
          id="darkModeSwitch"
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="hidden"
        />
        <div className="toggle__line w-8 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div
          className={`toggle__dot absolute w-4 h-4 bg-white rounded-full shadow inset-y-0 left-0 ${
            isDarkMode ? "transform translate-x-full" : "transform translate-x-0"
          }`}
        ></div>
      </div>
      <div
        className={`ml-3 font-medium ${
          isDarkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {isDarkMode ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-duotone fa-moon"></i>
        )}
      </div>
    </label>
  );
};

export default DarkSwitch;
