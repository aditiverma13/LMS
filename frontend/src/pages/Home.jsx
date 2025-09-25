import React from "react";
import { useNavigate } from "react-router-dom";
import { SiViaplay } from "react-icons/si";

import home from "../assets/homeani.png";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";

import Nav from "../components/Nav";
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage";
import ExploreCourses from "../components/ExploreCourses";
import About from "../components/About";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          className="object-cover md:object-fill w-full lg:h-full h-[50vh]"
          alt="Hero Background"
        />

        {/* Headings */}
        <span className="lg:text-[70px] md:text-[40px] text-[20px] absolute lg:top-[10%] top-[15%] w-full flex items-center justify-center text-white font-bold">
          Grow Your Skills to Advance
        </span>
        <span className="lg:text-[70px] md:text-[40px] text-[20px] absolute lg:top-[18%] top-[20%] w-full flex items-center justify-center text-white font-bold">
          Your Career Path
        </span>

        {/* Buttons */}
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-full flex items-center justify-center gap-3 flex-wrap">
          <button
            className="px-5 py-2 border-2 lg:border-white border-black lg:text-white text-black rounded-lg text-[18px] font-light flex gap-2 cursor-pointer items-center"
            onClick={() => navigate("/allcourses")}
          >
            View all Courses
            <SiViaplay className="w-6 h-6 lg:fill-white fill-black" />
          </button>

          <button
            className="px-5 py-2 lg:bg-white bg-black lg:text-black text-white rounded-lg text-[18px] font-light flex gap-2 cursor-pointer items-center"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI
            <img
              src={ai}
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
              alt="AI Icon"
            />
            <img
              src={ai1}
              className="w-[35px] h-[35px] rounded-full lg:hidden"
              alt="AI Mobile Icon"
            />
          </button>
        </div>
      </div>

      {/* Sections */}
      <Logos />
      <ExploreCourses />
      <Cardspage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
}

export default Home;

