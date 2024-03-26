import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import CreativeCard from "../components/CreativeCard";
import { useAuth } from "../store/auth";

const Home = () => {

  const {isLoggedIn} = useAuth()

  // const [adActive, setAdActive] = useState(true);

  // const handleClose = () => {
  //   setAdActive(false);
  // };
  return (
    <>
      <Navbar />

      {/* <div
        className={`bg-green-500 rounded-md shadow-md top-[80px]  gap-4 px-3 h-auto absolute flex justify-evenly content-center items-center py-2 text-slate-300 p-2 ${
          adActive ? "" : "hidden"
        }`}
      >
        <p className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum similique dicta ut debitis aut fuga quod! Exercitationem 
        </p>
        <button onClick={handleClose} className="w-5 text-gray-800">
          x
        </button>
      </div> */}

      <div
        id="parent"
        className="flex h-full items-center justify-center content-center py-16 gap-10 md:px-10"
        style={{ background: "#FEF9F3" }}
      >
        <div>
          <img
            src="https://img.freepik.com/free-vector/flat-background-international-friendship-day-celebration_23-2150502109.jpg?w=1060&t=st=1709898049~exp=1709898649~hmac=c879bd2973db25538f7ed2fd29aa202241f0ead165e5114c01362c4636b5e910"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 content-center">
          <h1 className="text-4xl font-bold text-justify">
            Welcome to <span className="text-orange-700">Colidea</span>
          </h1>
          <p className="px-8 text-justify text-gray-600">
            Introducing a dynamic blog-sharing and doubt-clearing platform
            crafted exclusively for students and professionals! Connect, share,
            and gain valuable experiences with your campus buddies and even
            extend your network beyond the campus boundaries.
          </p>
          <div className="flex justify-evenly items-center content-center gap-7 md:gap-0 md:w-1/3">
            <Link
              to={isLoggedIn ? "/relax" : "/login"}
              className="bg-orange-600 p-2 rounded-md text-white hover:bg-orange-700"
            >
              Enter Colidea
            </Link>
            <Link
              to="/getStarted"
              className="p-2 rounded-md border border-orange-500 text-orange-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white flex items-center justify-center content-center py-16 gap-10 md:px-10 px-8 flex-wrap md:flex-nowrap">
        <div className="flex flex-col gap-8">
          <h1 className="text-slate-600 text-3xl font-semibold">
            Why should I use Colidea?
          </h1>
          <p className="text-slate-600 leading-8 text-justify">
            "Discover Colidea: Your Gateway to Seamless Connections, Skill
            Exploration, and Collaborative Growth. Elevate your online
            experience, connect with diverse talents, and unlock a world of
            possibilities. Join Colidea today!"
          </p>
        </div>
        <div className="flex flex-col gap-7 md:grid md:gap-3 md:grid-cols-2">
          <CreativeCard
            title="Connect with people"
            icon={<i className="fa-solid fa-people-group"></i>}
            body="Connect with individuals from various institutes without any limitations."
          />
          <CreativeCard
            title="Explore talent"
            icon={<i className="fa-solid fa-stars"></i>}
            body="Feel free to explore various trending skills that you might be familiar with, and take the opportunity to read up on them."
          />
          <CreativeCard
            title="Share skills"
            icon={<i className="fa-solid fa-person-rays"></i>}
            body="While we can't physically shake hands online, we can definitely exchange knowledge and skills."
          />
          <CreativeCard
            title="Be a star"
            icon={<i class="fa-solid fa-star-shooting"></i>}
            body="Build huge netwrok with lots of followers to get a verified badge."
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
