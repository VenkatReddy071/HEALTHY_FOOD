import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-10 py-4 m-2">
      <div className="container mx-auto py-10 px-5 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold">FOOD</h2>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo
            libero vitae arcu tristique elementum vulputate integer id.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-orange-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-orange-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-orange-500">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-orange-500">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Opening Restaurant</h3>
          <p className="text-sm">Sat-Wed: 09:00am-10:00pm</p>
          <p className="text-sm">Thursday: 09:00am-11:00pm</p>
          <p className="text-sm">Friday: 09:00am-8:00pm</p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">User Link</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Order Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Payment & Tax
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Terms of Services
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p className="text-sm">
            1234 Country Club Ave <br />
            NC 123456, London, UK <br />
            +0123 456 7891
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full mt-2 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
