import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const courses = userData?.enrolledCourses || [];

  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50 relative">
      {/* Back Button */}
      <FaArrowLeftLong
        className="absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Page Title */}
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
        My Enrolled Courses
      </h1>

      {/* No Courses Case */}
      {courses.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          You haven’t enrolled in any course yet.
        </p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border w-72"
            >
              {/* Course Thumbnail */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              {/* Course Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600">{course.category}</p>
                <p className="text-sm text-gray-700">{course.level}</p>

                {/* Watch Button */}
                <button
                  className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourse;

