import React from "react";
import { BsClock, BsFillAwardFill } from "react-icons/bs";
import { FaUtensils, FaHandsHelping, FaShieldAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const ServicePage = () => {
  const services = [
    {
      icon: <BsClock className="text-blue-600 text-5xl" />, // Modern color tone
      title: "Fast and Reliable Delivery",
      description:
        "Get your meals delivered hot and fresh in under 30 minutes. Enjoy real-time order tracking and a wide delivery network.",
    },
    {
      icon: <FaUtensils className="text-green-500 text-5xl" />, // Vibrant color
      title: "Wide Range of Cuisines",
      description:
        "Explore global cuisines from top-rated restaurants, including vegetarian, vegan, and specialty diets.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-500 text-5xl" />, // Bright and engaging
      title: "Exclusive Offers and Discounts",
      description:
        "Enjoy daily deals, loyalty rewards, and referral bonuses to satisfy your cravings without overspending.",
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-5xl" />, // Safety assurance
      title: "Health and Safety Commitment",
      description:
        "All orders are prepared in sanitized environments and delivered with tamper-proof packaging for your safety.",
    },
    {
      icon: <MdSupportAgent className="text-purple-600 text-5xl" />, // Emphasizing support
      title: "24/7 Customer Support",
      description:
        "Our dedicated team is always available to assist with your orders, modifications, and queries.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen p-10">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">Our Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl rounded-3xl p-8 transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <div className="flex justify-center mb-6">{service.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              {service.title}
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;