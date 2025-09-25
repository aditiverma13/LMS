import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FaEdit } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { serverUrl } from '../../App';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg";

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector(state => state.course);

  // -------------------- FETCH CREATOR COURSES --------------------
  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/course/getcreatorcourses`, { withCredentials: true });
        dispatch(setCreatorCourseData(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch courses");
      }
    };
    getCreatorData();
  }, [dispatch]);

  // -------------------- JSX --------------------
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main container */}
      <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className='flex items-center gap-3'>
            <FaArrowLeftLong
              className='w-6 h-6 cursor-pointer'
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-xl font-semibold">Courses</h1>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>
        </div>

        {/* -------------------- Desktop Table View -------------------- */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                  {/* Course Thumbnail & Title */}
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={course?.thumbnail || img1}
                      alt={course?.title || "Course Thumbnail"}
                      className="w-25 h-14 object-cover rounded-md"
                    />
                    <span>{course?.title}</span>
                  </td>

                  {/* Course Price */}
                  <td className="py-3 px-4">{course?.price ? `₹${course.price}` : "₹ NA"}</td>

                  {/* Course Status */}
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${course?.isPublished ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* Edit Action */}
                  <td className="py-3 px-4">
                    <FaEdit
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/addcourses/${course?._id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* -------------------- Mobile Card View -------------------- */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <img
                  src={course?.thumbnail || img1}
                  alt={course?.title || "Course Thumbnail"}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course?.title}</h2>
                  <p className="text-gray-600 text-xs mt-1">{course?.price ? `₹${course.price}` : "₹ NA"}</p>
                </div>
                <FaEdit
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/addcourses/${course?._id}`)}
                />
              </div>
              <span className={`w-fit px-3 py-1 text-xs rounded-full ${course?.isPublished ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                {course?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4">
            A list of your recent courses.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Courses;

