import React, { useState, useEffect } from "react";
import logo from "../assets/chatgpt logo1.png";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      setShowPro(false);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#desktopProfileDropdown") &&
        !e.target.closest("#desktopProfileIcon")
      ) {
        setShowPro(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      {/* Main Navbar */}
      <div className="w-full h-[70px] fixed top-0 px-5 flex items-center justify-between bg-black bg-opacity-60 z-50">
        {/* Logo */}
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            className="w-[60px] h-[60px] rounded-full object-cover cursor-pointer"
            onClick={() => navigate("/")}
            alt="EduCrafted Logo"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Educator Dashboard */}
          {userData?.role === "educator" && (
            <button
              className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          )}

          {/* Profile / Login */}
          <div className="relative">
            <div
              id="desktopProfileIcon"
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center border-2 border-white cursor-pointer"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData ? (
                userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    className="w-full h-full rounded-full object-cover"
                    alt="User"
                  />
                ) : (
                  <span>{userData?.name?.slice(0, 1).toUpperCase()}</span>
                )
              ) : (
                <IoMdPerson className="w-full h-full fill-white p-2" />
              )}
            </div>

            {/* Dropdown */}
            {showPro && (
              <div
                id="desktopProfileDropdown"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col z-50"
              >
                <button
                  className="px-4 py-2 hover:bg-gray-100 text-left"
                  onClick={() => {
                    navigate("/profile");
                    setShowPro(false);
                  }}
                >
                  My Profile
                </button>
                <button
                  className="px-4 py-2 hover:bg-gray-100 text-left"
                  onClick={() => {
                    navigate("/enrolledcourses");
                    setShowPro(false);
                  }}
                >
                  My Courses
                </button>
                {!userData ? (
                  <button
                    className="px-4 py-2 hover:bg-gray-100 text-left"
                    onClick={() => {
                      navigate("/login");
                      setShowPro(false);
                    }}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 hover:bg-gray-100 text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <GiHamburgerMenu
          className="w-[30px] h-[30px] fill-white lg:hidden cursor-pointer"
          onClick={() => setShowHam(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center gap-6 z-50 transform transition-transform duration-500 ${
          showHam ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowHam(false)}
        />
        <button
          className="px-16 py-4 border-2 border-white text-white rounded-lg text-lg"
          onClick={() => {
            navigate("/profile");
            setShowHam(false);
          }}
        >
          My Profile
        </button>
        <button
          className="px-16 py-4 border-2 border-white text-white rounded-lg text-lg"
          onClick={() => {
            navigate("/enrolledcourses");
            setShowHam(false);
          }}
        >
          My Courses
        </button>
        {userData?.role === "educator" && (
          <button
            className="px-16 py-4 border-2 border-white text-white rounded-lg text-lg"
            onClick={() => {
              navigate("/dashboard");
              setShowHam(false);
            }}
          >
            Dashboard
          </button>
        )}
        {!userData ? (
          <button
            className="px-16 py-4 border-2 border-white text-white rounded-lg text-lg"
            onClick={() => {
              navigate("/login");
              setShowHam(false);
            }}
          >
            Login
          </button>
        ) : (
          <button
            className="px-16 py-4 border-2 border-white text-white rounded-lg text-lg"
            onClick={() => {
              handleLogout();
              setShowHam(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
