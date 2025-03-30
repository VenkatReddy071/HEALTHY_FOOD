import React,{useState,useEffect} from "react";
import PopularItem from "./PopularItem";
import photo1 from "../../assets/photo1.jpg";
import photo2 from "../../assets/photo2.jpg";
import photo3 from "../../assets/photo3.jpg";
import {  BiChevronRight } from "react-icons/bi";
import Axios from "axios"
import {Link} from "react-router-dom";
export const Popular = () => {
  const [items,setItems]=useState([])
  const url="https://healthy-food-1.onrender.com/api/"
  useEffect(()=>{
    Axios.get(url+"best")
    .then((response)=>{
      setItems(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <div>
      {/* Heading Section */}
      <div className="text-center p-2 m-4">
        <h3 className="font-base text-orange-400">Product</h3>
        <h1 className="font-bold text-black text-3xl">Most Popular Items</h1>
      </div>

      {/* Items Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:mx-16 mx-4">
        {items.map((item, index) => (
          <PopularItem
            key={index}
            image={item.images[0]}
            name={item.name}
            rating={item.averageRating}
            price={item.price}
            item={item}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-4 p-2">
            <Link to="/menu">
            <div className="bg-orange-400 flex items-center gap-3 px-4 py-2 w-fit rounded-full shadow-md">
                {/* Text Section */}
                <button className="text-white font-medium text-sm focus:outline-none">
                See More Product
                </button>
                {/* Icon Section */}
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white text-orange-400 cursor-pointer hover:scale-110 transition-transform duration-300">
                <BiChevronRight size={24} />
                </div>
            </div>
            </Link>
            
      </div>


    </div>
  );
};
