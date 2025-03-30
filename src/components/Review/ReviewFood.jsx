import React, { useState } from "react";

export const ReviewFood = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Maryam",
      rating: 1,
      deliveryType: "DELIVERY",
      review: "Undercooked worst chicken",
      time: "an hour ago",
    },
    {
      name: "MURSID ALAM",
      rating: 5,
      deliveryType: "DELIVERY",
      review: "Quantity was very good",
      time: "an hour ago",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    review: "",
  });

  const addReview = () => {
    if (newReview.name && newReview.rating && newReview.review) {
      setReviews([
        ...reviews,
        {
          name: newReview.name,
          rating: newReview.rating,
          deliveryType: "DELIVERY",
          review: newReview.review,
          time: "just now",
        },
      ]);
      setNewReview({ name: "", rating: 0, review: "" });
    } else {
      alert("Please fill all fields before submitting the review!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Reviews</h2>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-4 mb-4 flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold text-gray-700 text-lg mb-1">{review.name}</h3>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <span
                className={`px-3 py-1 rounded-full text-white font-semibold ${
                  review.rating >= 3 ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {review.rating}★
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                {review.deliveryType}
              </span>
              <span>{review.time}</span>
            </div>
            <p className="text-gray-700 mt-2 leading-relaxed">{review.review}</p>
          </div>
          <button className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition">
            Follow
          </button>
        </div>
      ))}

      {/* Add Review Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a Review</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Write your review here..."
            value={newReview.review}
            onChange={(e) =>
              setNewReview({ ...newReview, review: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={addReview}
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};