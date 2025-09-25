import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import img from "../../assets/empty.jpg";
import { serverUrl } from '../../App';
import { setCourseData } from '../../redux/courseSlice';

function AddCourses() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseData } = useSelector(state => state.course);

  // -------------------- STATE --------------------
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const thumb = useRef();

  // -------------------- FETCH COURSE DATA --------------------
  const getCourseById = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, { withCredentials: true });
      setSelectedCourse(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch course data");
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || '');
      setSubTitle(selectedCourse.subTitle || '');
      setDescription(selectedCourse.description || '');
      setCategory(selectedCourse.category || '');
      setLevel(selectedCourse.level || '');
      setPrice(selectedCourse.price || '');
      setFrontendImage(selectedCourse.thumbnail || img);
      setIsPublished(selectedCourse?.isPublished || false);
    }
  }, [selectedCourse]);

  // -------------------- HANDLERS --------------------
  const handleThumbnail = e => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const editCourseHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('level', level);
    formData.append('price', price);
    formData.append('thumbnail', backendImage);
    formData.append('isPublished', isPublished);

    try {
      const result = await axios.post(`${serverUrl}/api/course/editcourse/${courseId}`, formData, { withCredentials: true });
      const updatedCourse = result.data;

      // Update redux course data
      if (updatedCourse.isPublished) {
        const updatedCourses = courseData.map(c => c._id === courseId ? updatedCourse : c);
        if (!courseData.some(c => c._id === courseId)) updatedCourses.push(updatedCourse);
        dispatch(setCourseData(updatedCourses));
      } else {
        dispatch(setCourseData(courseData.filter(c => c._id !== courseId)));
      }

      toast.success('Course Updated');
      navigate('/courses');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async () => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/course/removecourse/${courseId}`, { withCredentials: true });
      toast.success('Course Deleted');
      dispatch(setCourseData(courseData.filter(c => c._id !== courseId)));
      navigate('/courses');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to delete course');
    } finally {
      setLoading(false);
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 relative gap-4">
        <FaArrowLeftLong
          className='absolute left-0 md:left-2 top-2 w-6 h-6 cursor-pointer'
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold md:pl-16 text-center md:text-left">
          Add Detail Information Regarding Course
        </h2>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
        >
          Go to Lectures Page
        </button>
      </div>

      {/* Form Box */}
      <div className="bg-gray-50 p-6 rounded-md space-y-6">

        {/* Publish / Unpublish & Remove */}
        <div className="flex flex-wrap gap-4">
          <button
            className={`px-4 py-2 rounded-md ${!isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
            onClick={() => setIsPublished(prev => !prev)}
          >
            {isPublished ? 'Click to UnPublish' : 'Click to Publish'}
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            disabled={loading}
            onClick={removeCourse}
          >
            {loading ? <ClipLoader size={24} color="white" /> : 'Remove Course'}
          </button>
        </div>

        <form onSubmit={e => e.preventDefault()} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Course Title"
              className="w-full border px-4 py-2 rounded-md"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              placeholder="Subtitle"
              className="w-full border px-4 py-2 rounded-md"
              value={subTitle}
              onChange={e => setSubTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Course Description"
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Category / Level / Price */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full border px-4 py-2 rounded-md"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
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

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
              <select
                className="w-full border px-4 py-2 rounded-md"
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
              <input
                type="number"
                placeholder="₹"
                className="w-full border px-4 py-2 rounded-md"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
            <input
              type="file"
              ref={thumb}
              hidden
              accept="image/*"
              onChange={handleThumbnail}
            />
            <div className="relative w-[300px] h-[170px] cursor-pointer">
              <img
                src={frontendImage || img}
                alt="Course Thumbnail"
                className="w-full h-full rounded-md object-cover border"
                onClick={() => thumb.current.click()}
              />
              <MdEdit
                className="absolute top-2 right-2 w-5 h-5"
                onClick={() => thumb.current.click()}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-gray-200 hover:bg-red-200 text-black px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 flex items-center justify-center"
              disabled={loading}
              onClick={editCourseHandler}
            >
              {loading ? <ClipLoader size={24} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourses;

