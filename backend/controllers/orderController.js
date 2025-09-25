// import Course from "../models/courseModel.js";
// import razorpay from 'razorpay'
// import User from "../models/userModel.js";
// import dotenv from "dotenv"
// dotenv.config()
// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// })

// export const createOrder = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     const options = {
//       amount: course.price * 100, // in paisa
//       currency: 'INR',
//       receipt: `${courseId}.toString()`,
//     };

//     const order = await razorpayInstance.orders.create(options);
//     return res.status(200).json(order);
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({ message: `Order creation failed ${err}` });

//   }
// };



// export const verifyPayment = async (req, res) => {
//   try {
    
//         const {razorpay_order_id , courseId , userId} = req.body
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if(orderInfo.status === 'paid') {
//       // Update user and course enrollment
//       const user = await User.findById(userId);
//       if (!user.enrolledCourses.includes(courseId)) {
//         user.enrolledCourses.push(courseId);
//         await user.save();
//       }

//       const course = await Course.findById(courseId).populate("lectures");
//       if (!course.enrolledStudents.includes(userId)) {
//         course.enrolledStudents.push(userId);
//         await course.save();
//       }

//       return res.status(200).json({ message: "Payment verified and enrollment successful" });
//     } else {
//       return res.status(400).json({ message: "Payment verification failed (invalid signature)" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error during payment verification" });
//   }
// };


import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ---------------- CREATE ORDER ----------------
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const options = {
      amount: Number(course.price) * 100, // convert to paisa
      currency: "INR",
      receipt: courseId.toString(),
      payment_capture: 1, // auto capture
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return res.status(500).json({ message: `Order creation failed: ${err.message}` });
  }
};

// ---------------- VERIFY PAYMENT ----------------
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = req.body;

    // Generate expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed (invalid signature)" });
    }

    // Update user and course enrollment
    const user = await User.findById(userId);
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    const course = await Course.findById(courseId);
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(200).json({ message: "Payment verified and enrollment successful" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ message: "Internal server error during payment verification" });
  }
};

