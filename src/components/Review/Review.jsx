import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for navigation
import Last from "../../assets/last.webp"
import Icon from "../../assets/icon.png"
export const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const users = [
    {
      id: 1,
      name: "John Doe",
      designation: "CEO & Co-Founder",
      review: "The food was absolutely delicious! The delivery was prompt, and the diet plan suited my health goals perfectly.",
      profileImage: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Dietitian",
      review: "Amazing service! The dietitian's recommendations were spot on, and the meals were fresh and tasty.",
      profileImage: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Emily Johnson",
      designation: "Fitness Trainer",
      review: "I loved the variety of food options available. The delivery was slightly delayed, but overall a great experience.",
      profileImage: "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  const currentUser = users[currentIndex];

  return (
    <div>
        <div className="flex  flex-col gap-2 p-4 md:flex-row justify-center items-center py-10 px-4 bg-gray-50">
      <div className="md:max-w-3xl w-full flex items-center relative h-80">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Review Card */}
        <div className="bg-white rounded-2xl shadow-xl  flex flex-col items-center text-center w-full p-3 md:p-8 md:mx-16">
          <img
            src={currentUser.profileImage}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full shadow-md mb-4"
          />
          <h2 className="text-lg font-semibold">{currentUser.name}</h2>
          <p className="text-gray-500 text-sm">{currentUser.designation}</p>
          <p className="mt-4 text-gray-700 italic">"{currentUser.review}"</p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className='md:w-3/12 h-auto  rounded-full w-full'>
        <img src={Last} alt="" className='rounded-2xl'/>
      </div>
        </div>
        <div className=" px-6 mx-4  p-4 md:flex bg-neutral-900 text-white  lg:px-16 rounded-2xl overflow-hidden shadow-xl lg:mx-10">
      {/* Left Image */}
      <div className="   w-64 h-64 lg:w-80 lg:h-80">
        <img
          src={Icon}
          alt="Burger"
          className="w-full h-full object-cover rounded-full shadow-md"
        />
      </div>

      {/* Right Content */}
      <div className=" flex flex-col justify-center items-start ml-auto lg:w-2/3">
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          Subscribe To Our Newsletter!
        </h2>
        <p className="text-sm lg:text-base mb-6">
          Stay updated with our latest offers, delicious recipes, and special
          promotions. Join our food-loving community today!
        </p>
        <div className="md:flex md:w-full max-w-lg w-90 flex">
          <input
            type="email"
            placeholder="Type your email..."
            className="flex-grow  rounded-l-full border-none outline-none text-black"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-r-full font-semibold transition duration-300 ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    
    </div>
    
  );
};
