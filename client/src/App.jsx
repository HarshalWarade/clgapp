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

const App = () => {
  const {isLoggedIn} = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getStarted" element={<Register />} />
          {
            isLoggedIn ? (
              <Route path="/relax" element={<Relax />} />
              ) : (
                <Route path="/relax" element={<ErrorPage />} />
            )
          }
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
