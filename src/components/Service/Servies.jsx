import React from 'react';
import { GiKnifeFork } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { CiDeliveryTruck } from "react-icons/ci";
import delivary from "../../assets/delivary.webp";
import laptop from "../../assets/laptop.jpg";
import level from "../../assets/level.jpeg";

export const Servies = () => {
  const list = [
    {
      icon: <GiKnifeFork />,
      name: "Quality Food",
      info: "We prioritize high-quality ingredients to ensure every meal is delicious and nutritious.",
    },
    {
      icon: <ImSpoonKnife />,
      name: "Healthy Food",
      info: "Our meals are crafted to support your health goals with balanced nutrition and fresh ingredients.",
    },
    {
      icon: <CiDeliveryTruck />,
      name: "Fast Delivery",
      info: "Experience lightning-fast delivery to ensure your food arrives fresh and on time.",
    },
  ];

  return (
    <div>
      {/* Services Header */}
      <div className="text-center p-2 m-4">
        <h3 className="font-base text-orange-400">Services</h3>
        <h1 className="font-bold text-black text-3xl">
          Why Choose Our Favorite Food
        </h1>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 py-4">
        {list.map((item, index) => (
          <div
            className="p-6 bg-white shadow-xl rounded-xl flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition duration-300"
            key={index}
          >
            <div className="w-16 h-16 bg-orange-300 rounded-full flex justify-center items-center text-3xl text-white">
              {item.icon}
            </div>
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
              {item.name}
            </h1>
            <p className="mt-2 text-gray-600 text-sm">{item.info}</p>
          </div>
        ))}
      </div>

      {/* How to Work Header */}
      <div className="text-center p-2 m-4">
        <h3 className="font-base text-orange-400">How to Work</h3>
        <h1 className="font-bold text-black text-3xl">
          Food Is an Important Part of a Balanced Diet
        </h1>
      </div>

      {/* How to Work Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  m-4 gap-8 md:gap-16 px-4 md:px-16">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center rounded-xl overflow-hidden bg-white shadow-md p-4 w-full md:w-full">
          <img
            src={laptop}
            alt="Choose"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold text-gray-800">CHOOSE</h3>
          <p className="text-sm text-gray-600 mt-2">
            Do you want to lose weight, exercise, adhere to a therapeutic diet?
            Our dietitian will help you with choosing the right program!
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center rounded-xl overflow-hidden bg-white shadow-md p-4 w-full md:w-full">
          <img
            src={level}
            alt="Prepare Food"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold text-gray-800">PREPARE FOOD</h3>
          <p className="text-sm text-gray-600 mt-2">
            We carefully prepare food with attention to your dietary preferences
            and goals.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center rounded-xl overflow-hidden bg-white shadow-md p-4 w-full md:full">
          <img
            src={delivary}
            alt="Deliver"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold text-gray-800">DELIVER</h3>
          <p className="text-sm text-gray-600 mt-2">
            Get your healthy, delicious food delivered to your doorstep on time!
          </p>
        </div>
      </div>

      {/* Testimonials Header */}
      <div className="text-center p-2 m-4">
        <h3 className="font-base text-orange-400">Testimonials</h3>
        <h1 className="font-bold text-black text-3xl">Our Happy Client Says</h1>
      </div>
    </div>
  );
};
