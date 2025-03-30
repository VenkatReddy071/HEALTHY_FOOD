// import React, { useState } from "react";

// const FiltersModal = ({ setOpen,setItems }) => {
//   const [activeFilter, setActiveFilter] = useState("Sort by");
//   const [sortOption, setSortOption] = useState("Popularity");
//   const [cuisineSearch, setCuisineSearch] = useState("");
//   const [selectedRating, setSelectedRating] = useState("Any");

//   const handleRatingChange = (rating) => {
//     setSelectedRating(rating);
//   };
//   const url="http://localhost:3000/api/"
//   const handleHign=()=>{
//     Axios.post(url+"low-high",{order:"desc"},{withCredentials:true})
//     .then((response)=>{
//       setItems(response.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }
//   const handleLow=()=>{
//     Axios.post(url+"low-high",{order:"des"},{withCredentials:true})
//     .then((response)=>{
//       setItems(response.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }
//   const handleRating=()=>{
//     Axios.post(url+"rating",{withCredentials:true})
//     .then((response)=>{
//       setItems(response.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }
//   const handleRatingBase=(rating)=>{
//     Axios.post(url+"ratingBase",{minRating:rating},{withCredentials:true})
//     .then((response)=>{
//       setItems(response.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   } 

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-lg md:max-w-3xl mx-4 rounded-xl shadow-2xl p-4 md:p-6 relative">
//         {/* Header */}
//         <div className="flex justify-between items-center pb-4 border-b">
//           <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
//           <button
//             className="text-gray-500 text-2xl font-bold focus:outline-none hover:text-gray-700"
//             onClick={() => setOpen(false)}
//           >
//             &times;
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
//           {/* Sidebar Options */}
//           <div className="w-full md:w-1/4">
//             <ul className="space-y-4 text-gray-600 font-medium">
//               {["Sort by", "Cuisines", "Rating"].map((filter) => (
//                 <li
//                   key={filter}
//                   className={`cursor-pointer px-3 py-2 rounded-lg transition ${
//                     activeFilter === filter
//                       ? "bg-red-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                   onClick={() => setActiveFilter(filter)}
//                 >
//                   {filter}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Filter Content */}
//           <div className="flex-1">
//             {activeFilter === "Sort by" && (
//               <div>
//                 <h3 className="text-lg font-bold text-gray-700 mb-4">
//                   {sortOption}
//                 </h3>
//                 <div className="space-y-3">
//                   {[
//                     "Popularity",
//                     "Rating: High to Low",
//                     "Cost: Low to High",
//                     "Cost: High to Low",
//                   ].map((option) => (
//                     <label
//                       key={option}
//                       className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg"
//                     >
//                       <input
//                         type="radio"
//                         name="sort"
//                         value={option}
//                         checked={sortOption === option}
//                         onChange={(e) => setSortOption(e.target.value)}
//                         className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400"

//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeFilter === "Cuisines" && (
//               <div>
//                 <h3 className="text-lg font-bold text-gray-700 mb-4">
//                   Search Cuisines
//                 </h3>
//                 <input
//                   type="text"
//                   value={cuisineSearch}
//                   onChange={(e) => setCuisineSearch(e.target.value)}
//                   placeholder="Type to search..."
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 />
//               </div>
//             )}

//             {activeFilter === "Rating" && (
//               <div>
//                 <h3 className="text-lg font-bold text-gray-700 mb-4">Rating</h3>
//                 <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
//                   {["Any", "3.5", "4.0", "4.5", "5.0"].map((rating) => (
//                     <button
//                       key={rating}
//                       onClick={() => handleRatingChange(rating)}
//                       className={`px-3 py-2 text-sm rounded-full transition ${
//                         selectedRating === rating
//                           ? "bg-red-500 text-white"
//                           : "bg-gray-200 hover:bg-gray-300"
//                       }`}
//                     >
//                       {rating}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t pt-4">
//           <button
//             className="text-gray-500 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
//             onClick={() => {
//               setSortOption("Popularity");
//               setSelectedRating("Any");
//               setCuisineSearch("");
//               console.log("Clear all filters");
//             }}
//           >
//             Clear All
//           </button>

//           <button
//             className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 w-full sm:w-auto"
//             onClick={() =>
//               console.log({ sortOption, selectedRating, cuisineSearch })
//             }
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FiltersModal;
import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FiltersModal = ({ setOpen, setItems }) => {
  const [activeFilter, setActiveFilter] = useState("Sort by");
  const [sortOption, setSortOption] = useState("Popularity");
  const [selectedRating, setSelectedRating] = useState("Any");

  const url = "https://healthy-food-1.onrender.com/api/filter/";

  const fetchFilteredItems = (endpoint, params = {}) => {
    toast.info("Fetching data, please wait...");
    Axios.get(url + endpoint, { params, withCredentials: true })
      .then((response) => {
        setItems(response.data);
        toast.success("Filters applied successfully!");
        
      })
      .catch((error) => {
        toast.error(
          `Error fetching data: ${error.response?.data?.message || "Unknown error"}`
        );
        console.error(error.response?.data || error);
      });
  };

  const handleSort = (order) => fetchFilteredItems("low-high", { order });
  const handleRating = () => fetchFilteredItems("rating");
  const handleRatingBase = (minRating) =>
    fetchFilteredItems("ratingBase", { minRating });

  const applyFilters = () => {
    if (sortOption === "Cost: High to Low") {
      handleSort("desc");
    } else if (sortOption === "Cost: Low to High") {
      handleSort("asc");
    } else if (sortOption === "Rating: High to Low") {
      handleRating();
    } else if (selectedRating !== "Any") {
      handleRatingBase(selectedRating);
    }
  };

  const clearFilters = () => {
    setSortOption("Popularity");
    setSelectedRating("Any");
    fetchFilteredItems("");
  };

  const sortOptions = [
    "Popularity",
    "Rating: High to Low",
    "Cost: Low to High",
    "Cost: High to Low",
  ];
  const ratings = ["Any", "3.5", "4.0", "4.5", "5.0"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg md:max-w-3xl mx-4 rounded-xl shadow-2xl p-4 md:p-6 relative overflow-y-scroll h-[50vh] md:h-auto overflow-auto">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
          <button
            className="text-gray-500 text-2xl font-bold focus:outline-none hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
          <div className="w-full md:w-1/4">
            <ul className="space-y-4 text-gray-600 font-medium">
              {["Sort by", "Rating"].map((filter) => (
                <li
                  key={filter}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                    activeFilter === filter
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            {activeFilter === "Sort by" && (
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  {sortOption}
                </h3>
                <div className="space-y-3">
                  {sortOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg"
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={option}
                        checked={sortOption === option}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === "Rating" && (
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-4">Rating</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {ratings.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`px-3 py-2 text-sm rounded-full transition ${
                        selectedRating === rating
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t pt-4">
          <button
            className="text-gray-500 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
            onClick={clearFilters}
          >
            Clear All
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 w-full sm:w-auto"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FiltersModal;
