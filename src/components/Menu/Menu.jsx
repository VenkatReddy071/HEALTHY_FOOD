import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopularItem from "../Products/PopularItem";
import Nonveg from "../../assets/nonveg.jpeg";
import Veg from "../../assets/veg.jpg";
import Filter from "./Filter";
export const Menu = () => {
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const url = "https://healthy-food-1.onrender.com/api";

  useEffect(() => {
    toast.info("Loading Data");
    Axios.get(url)
      .then((response) => {
        setItems(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleType = (selectedType) => {
    setType(selectedType);
  };

  const filteredItems =
    type === null
      ? items
      : items.filter((item) =>
          type === "Veg" ? item.category === "Veg" : item.category === "Non-Veg"
        );

  return (
    <div className="md:p-8 md:m-6 h-auto">
      {/* Food Type Options */}
      <div className="flex gap-6 p-4">
        {/* Veg Option */}
        <div
          className={`flex items-center md:gap-4 gap-2 cursor-pointer md:p-4 p-2 ${
            type === "Veg" ? "border-b-2 border-orange-400" : ""
          }`}
          onClick={() => handleType("Veg")}
        >
          <img
            src={Veg}
            alt="Veg"
            className={`md:w-20 md:h-20 w-12 h-12 rounded-full object-cover ${
              type === "Veg" ? "filter-none" : "filter grayscale"
            }`}
          />
          <h2
            className={`md:text-xl text-base font-semibold ${
              type === "Veg" ? "text-orange-400" : "text-gray-400"
            }`}
          >
            Pure Veg
          </h2>
        </div>

        {/* Non-Veg Option */}
        <div
          className={`flex items-center md:gap-4 gap-2 cursor-pointer md:p-4 p-2 ${
            type === "Non-Veg" ? "border-b-2 border-orange-400" : ""
          }`}
          onClick={() => handleType("Non-Veg")}
        >
          <img
            src={Nonveg}
            alt="Non-Veg"
            className={`md:w-20 md:h-20 w-12 h-12 rounded-full object-cover ${
              type === "Non-Veg" ? "filter-none" : "filter grayscale"
            }`}
          />
          <h2
            className={`md:text-xl text-base font-semibold ${
              type === "Non-Veg" ? "text-orange-400" : "text-gray-400"
            }`}
          >
            Pure Non-Veg
          </h2>
        </div>
      </div>

      <div className="p-2 m-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-gray-200 border-2"
          onClick={() => setOpen(true)}
        >
          <span className="text-xl text-gray-600">
            <BsFilterLeft />
          </span>
          <h1 className="text-lg font-medium text-gray-600">Filters</h1>
        </button>
      </div>

      {open && (
        <div>
          <Filter setOpen={setOpen} setItems={setItems}/>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:mx-16 mx-4">
        {filteredItems.map((item, index) => (
          <PopularItem
            key={index}
            image={item.images[0]}
            name={item.name}
            rating={item.averageRating}
            price={item.price}
            item={item}
            id={item._id}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};
