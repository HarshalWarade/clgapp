import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </React.StrictMode>
  </AuthProvider>
);
