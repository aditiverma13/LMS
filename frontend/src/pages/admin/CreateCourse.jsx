import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import { serverUrl } from "../../App";

const CreateCourse = () => {
  const navigate = useNavigate();

  // -------------------- STATE --------------------
  const [title, setTitle] = useState("");           // Course title
  const [category, setCategory] = useState("");     // Course category
  const [loading, setLoading] = useState(false);    // Loading state for submit button

  // -------------------- CREATE COURSE HANDLER --------------------
  const createCourseHandler = async () => {
    if (!title || !category) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/course/create`,
        { title, category },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Course Created Successfully");
      setTitle("");
      setCategory("");
      navigate("/courses");  // Redirect to courses page
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-md relative">

        {/* Back Button */}
        <FaArrowLeftLong
          className="absolute top-6 left-5 w-6 h-6 cursor-pointer"
          onClick={() => navigate("/courses")}
        />

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Course</h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          {/* Course Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Enter course title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={createCourseHandler}
            className="w-full bg-black text-white py-2 px-4 rounded-md active:bg-gray-800 transition"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Create"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

