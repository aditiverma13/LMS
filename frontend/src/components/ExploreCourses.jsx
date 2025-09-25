import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics, TbBrandOpenai } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { SiGoogledataproc, SiOpenaigym } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ExploreCourses() {
  const navigate = useNavigate();

  // Course categories data (clean & reusable)
  const categories = [
    {
      name: "Web Development",
      icon: <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-[#6d6c6c]" />,
      bg: "bg-[#fbd9fb]",
    },
    {
      name: "UI UX Designing",
      icon: <LiaUikit className="w-[60px] h-[60px] text-[#6d6c6c]" />,
      bg: "bg-[#d9fbe0]",
    },
    {
      name: "App Development",
      icon: <MdAppShortcut className="w-[50px] h-[50px] text-[#6d6c6c]" />,
      bg: "bg-[#fcb9c8]",
    },
    {
      name: "Ethical Hacking",
      icon: <FaHackerrank className="w-[55px] h-[55px] text-[#6d6c6c]" />,
      bg: "bg-[#fbd9fb]",
    },
    {
      name: "AI/ML",
      icon: <TbBrandOpenai className="w-[55px] h-[55px] text-[#6d6c6c]" />,
      bg: "bg-[#d9fbe0]",
    },
    {
      name: "Data Science",
      icon: <SiGoogledataproc className="w-[45px] h-[45px] text-[#6d6c6c]" />,
      bg: "bg-[#fcb9c8]",
    },
    {
      name: "Data Analytics",
      icon: <BsClipboardDataFill className="w-[50px] h-[50px] text-[#6d6c6c]" />,
      bg: "bg-[#fbd9fb]",
    },
    {
      name: "AI Tools",
      icon: <SiOpenaigym className="w-[50px] h-[50px] text-[#6d6c6c]" />,
      bg: "bg-[#d9fbe0]",
    },
  ];

  return (
    <div className="w-full min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-6 px-[30px]">
      {/* Left Section */}
      <div className="w-full lg:w-[350px] lg:h-full h-[400px] flex flex-col items-start justify-center gap-2 md:px-[40px] px-[20px]">
        <h2 className="text-[35px] font-semibold">Explore</h2>
        <h2 className="text-[35px] font-semibold">Our Courses</h2>
        <p className="text-[17px] text-gray-700">
          Discover a variety of courses designed to help you grow in tech —
          from Web Development to AI and Data Science.
        </p>
        <button
          className="px-[20px] py-[10px] bg-black text-white rounded-[10px] text-[18px] font-light flex items-center gap-2 mt-[40px]"
          onClick={() => navigate("/allcourses")}
        >
          Explore Courses <SiViaplay className="w-[30px] h-[30px] fill-white" />
        </button>
      </div>

      {/* Right Section - Categories */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center flex-wrap gap-[50px] lg:gap-[60px] mb-[50px] lg:mb-0">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center"
          >
            <div
              className={`w-[100px] h-[90px] ${cat.bg} rounded-lg flex items-center justify-center`}
            >
              {cat.icon}
            </div>
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreCourses;

