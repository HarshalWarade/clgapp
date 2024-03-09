import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col gap-10 items-center content-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <img
          src="https://i.pinimg.com/736x/b8/fb/70/b8fb705699100d965d1ede440f63bd35.jpg"
          alt="404 Not Found"
          className="max-w-full"
        />
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
