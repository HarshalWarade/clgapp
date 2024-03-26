import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./store/auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import LogOut from "./pages/LogOut";
import Relax from "./pages/Relax";
import ContactUs from "./pages/ContactUs";
import Explore from "./pages/Explore";
import UserProfile from "./pages/UserProfile"; // Import the UserProfile component

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getStarted" element={<Register />} />
          {isLoggedIn ? (
            <Route path="/relax" element={<Relax />} />
          ) : (
            <Route path="/relax" element={<ErrorPage />} />
          )}
          {isLoggedIn ? (
            <Route path="/explore" element={<Explore />} />
          ) : (
            <Route path="/explore" element={<ErrorPage />} />
          )}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/logout" element={<LogOut />} />
          {/* New route for user profile */}
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
