
 

// export default ReviewPage

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);

  // ✅ Make sure the slice name matches your store setup
  const { allReview = [] } = useSelector((state) => state.review || {});

  useEffect(() => {
    if (Array.isArray(allReview) && allReview.length > 0) {
      setLatestReview(allReview.slice(0, 6));
    }
  }, [allReview]);

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Heading */}
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Real Reviews from Real Learners
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]">
        Discover how our Virtual Courses are transforming learning experiences
        through real feedback from students and professionals worldwide.
      </span>

      {/* Reviews Grid */}
      <div className="w-full min-h-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
        {latestReview.length > 0 ? (
          latestReview.map((item, index) => (
            <ReviewCard
              key={index}
              rating={item.rating}
              // ✅ fallback if `photoUrl` doesn’t exist
              image={item.user?.photoUrl || item.user?.avatar || "/default-user.png"}
              text={item.comment}
              name={item.user?.name || "Anonymous"}
              role={item.user?.role || "Learner"}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;

