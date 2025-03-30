import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Popular } from "../Products/Populat";
import { Review } from "../Review/Review";
import { Servies } from "../Service/Servies";
import Header11 from "../../assets/header.jpg"; // Path to your header image
import { photos } from "./List";
export const Header1 = () => {
  // Media query to determine screen size
  const isLargeDevice = useMediaQuery({ minWidth: 768 });
  const visiblePhotos = isLargeDevice ? 6 : 2;

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - visiblePhotos : prevIndex - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visiblePhotos >= photos.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* Navbar Component */}
    
      {/* Header Section */}
      <div
        className="h-96 bg-cover bg-center flex flex-col items-center justify-center relative"
        style={{
          backgroundImage: `url(${Header11})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative text-center text-white max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
            The Fastest Delivery <br />
            In <span className="text-orange-400">Your City</span>
          </h1>
          <p className="mt-4 text-lg">
            Enjoy a seamless experience with fresh, delicious meals delivered
            right to your doorstep. Choose from a wide range of options.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to={"/menu"}>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 shadow-lg">
              Order Now
            </button>
            </Link>
          
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 shadow">
              Order Process
            </button>
          </div>
        </div>
      </div>

      {/* Photo Carousel Section */}
      <div className="md:mx-8 md:m-3 mt-6 m-2 ">
        <div className="flex items-center gap-4">
          {/* Backward Button */}
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow"
            onClick={handlePrev}
          >
            <BiChevronLeft className="h-6 w-6 text-gray-800" />
          </button>

          {/* Photo List */}
          <div className="flex gap-4 overflow-hidden w-full">
            <div className="flex w-full justify-between">
              {photos
                .slice(startIndex, startIndex + visiblePhotos)
                .map((photo, index) => (
                  <Link to={"/menu"}>
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                  className="h-28 w-28 rounded-full shadow-sm object-cover cursor-pointer hover:scale-95 transition-transform duration-300"
                  />
                  </Link>
                ))}
            </div>
          </div>

          {/* Forward Button */}
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow"
            onClick={handleNext}
          >
            <BiChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
      <Popular/>
      <Servies/>
      <Review/>
    </div>
  );
};
