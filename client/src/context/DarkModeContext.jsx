// DarkModeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode is stored in localStorage, use that value, or default to false (light mode)
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Store the new mode in localStorage
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    // Listen for changes to dark mode in localStorage
    const handleStorageChange = () => {
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode !== null) {
        setIsDarkMode(JSON.parse(storedDarkMode));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
