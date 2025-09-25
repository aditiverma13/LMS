import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";

import { auth, provider } from "../../utils/Firebase";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

import logo from "../assets/chatgpt logo1.png";
import google from "../assets/google.jpg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // -------------------- STATE --------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false); // Loading state for login button

  // -------------------- HANDLE LOGIN --------------------
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- GOOGLE LOGIN --------------------
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlesignup`,
        { name: user.displayName, email: user.email, role: "" },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center flex-col gap-3">
      <form
        className="w-[90%] md:w-[800px] h-[500px] bg-white shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* LEFT SIDE: FORM */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-4">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-semibold text-black text-2xl">Welcome Back</h1>
            <h2 className="text-[#999797] text-lg">Login to your account</h2>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1 w-[85%]">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Your email"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1 w-[85%] relative">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              id="password"
              type={show ? "text" : "password"}
              placeholder="***********"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Toggle Password Visibility */}
            {show ? (
              <MdRemoveRedEye
                className="absolute w-5 h-5 cursor-pointer right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <MdOutlineRemoveRedEye
                className="absolute w-5 h-5 cursor-pointer right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          {/* Login Button */}
          <button
            className="w-[80%] h-[40px] bg-black text-white flex items-center justify-center rounded-md"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Login"}
          </button>

          {/* Forget Password */}
          <span
            className="text-xs text-[#585757] cursor-pointer"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot your password?
          </span>

          {/* Divider */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-1/4 h-[0.5px] bg-[#c4c4c4]" />
            <div className="w-1/2 text-center text-sm text-[#999797]">Or continue with</div>
            <div className="w-1/4 h-[0.5px] bg-[#c4c4c4]" />
          </div>

          {/* Google Login */}
          <div
            className="w-[80%] h-[40px] border border-[#d3d2d2] rounded-md flex items-center justify-center gap-2 cursor-pointer"
            onClick={googleLogin}
          >
            <img src={google} alt="Google" className="w-6" />
            <span className="text-gray-500 text-sm">Google</span>
          </div>

          {/* Sign Up */}
          <div className="text-[#6f6f6f] text-sm">
            Don't have an account?{" "}
            <span
              className="underline text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="md:w-[50%] h-full rounded-r-2xl bg-black hidden md:flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="w-40 shadow-2xl mb-4" />
          <span className="text-white text-2xl font-semibold">EduCrafted</span>
        </div>
      </form>
    </div>
  );
}

export default Login;

