import React, { useEffect, useState } from "react";
import Axios from "axios";

export const ProductDetailsPopup = ({ isOpen, onClose, id }) => {
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Fetch product details
  useEffect(() => {
    if (isOpen && id) {
      Axios.get(`https://healthy-food-1.onrender.com/api/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          alert("Unable to fetch product details.");
        });

      // Fetch reviews for the product
      Axios.get(`https://healthy-food-1.onrender.com/api/reviews/${id}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          alert("Unable to fetch reviews.");
        });
    }
  }, [id, isOpen]);

  // Post a new review
  const handlePostReview = () => {
    if (newReview.comment.trim()) {
      const user=localStorage.getItem("user")
      console.log(user)
      Axios.post(`https://healthy-food-1.onrender.com/api/reviews/${id}`, newReview,{ withCredentials: true })
        .then((response) => {
          setReviews((prev) => [...prev, response.data]);
          setNewReview({ rating: 5, comment: "" });
          setIsReviewModalOpen(false);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Failed to post review:", error);
          alert("Review submission failed.");
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative h-[75vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
        {product ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-gray-600 text-lg">Category: {product.category}</p>
                <p className="text-green-600 text-lg font-semibold">Price: ${product.price}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
              
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
            {/* Customer Reviews */}
            <div>
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Review
              </button>
              <div className="mt-4 max-h-60 overflow-y-auto space-y-4">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                  >
                    <h3 className="text-gray-800 font-semibold">
                      {review.user?.username || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                    <div className="mt-2 text-yellow-500">
                      {`${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">Loading...</div>
        )}

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold">Post a Review</h2>
              <div className="flex space-x-1 mt-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`cursor-pointer text-2xl ${
                      star <= newReview.rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Write your review here..."
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostReview}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
