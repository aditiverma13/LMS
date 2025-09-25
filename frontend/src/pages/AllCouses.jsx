import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../components/Card.jsx";
import Nav from "../components/Nav";
import ai from "../assets/SearchAi.png";

function AllCourses() {
  const navigate = useNavigate();

  // Sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Filter states
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);

  // Course data from Redux
  const { courseData } = useSelector((state) => state.course);

  /**
   * Toggle a category in filter
   */
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  /**
   * Apply filters whenever category changes
   */
  const applyFilter = () => {
    let courseCopy = [...courseData];

    if (category.length > 0) {
      courseCopy = courseCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    setFilterCourses(courseCopy);
  };

  // Set initial courses from Redux
  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  // Re-apply filter when category changes
  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navbar */}
      <Nav />

      {/* Sidebar Toggle Button (mobile only) */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black"
      >
        {isSidebarVisible ? "Hide" : "Show"} Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} 
        md:block md:translate-x-0`}
      >
        {/* Sidebar Heading */}
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
          <FaArrowLeftLong
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          />
          Filter by Category
        </h2>

        {/* Filter Form */}
        <form
          className="space-y-4 text-sm bg-gray-600 border-white text-white border p-5 rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* AI Search */}
          <button
            className="w-full px-3 py-2 bg-black text-white rounded-lg text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI
            <img
              src={ai}
              className="w-[30px] h-[30px] rounded-full"
              alt="AI Icon"
            />
          </button>

          {/* Category Checkboxes */}
          {[
            "App Development",
            "AI/ML",
            "AI Tools",
            "Data Science",
            "Data Analytics",
            "Ethical Hacking",
            "UI UX Designing",
            "Web Development",
            "Others",
          ].map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
            >
              <input
                type="checkbox"
                className="accent-black w-4 h-4 rounded-md"
                value={cat}
                onChange={toggleCategory}
              />
              {cat}
            </label>
          ))}
        </form>
      </aside>

      {/* Main Courses Section */}
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {filterCourses?.map((item, index) => (
          <Card
            key={index}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            category={item.category}
            id={item._id}
            reviews={item.reviews}
          />
        ))}
      </main>
    </div>
  );
}

export default AllCourses;
