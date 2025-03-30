import React from "react";

import { useState } from "react";
import { AddToCart } from '../Cart/AddToCart';
import { ProductDetailsPopup } from "./ProductId";
const PopularItem = ({ image, name, rating, price,item ,id}) => {
  const [openCart, setOpenCart] = useState(false);
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  const handleProduct=()=>{
    setIsProductPopupOpen(true);
  }
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      
        <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover cursor-pointer transform transition-transform duration-300 hover:scale-105" 
        onClick={()=>handleProduct()}
        />
    

      {/* Details Section */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h1 className="text-lg font-bold text-gray-800">{name}</h1>
          <p className="text-sm text-gray-500">Rating: {rating}⭐</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-orange-500">₹{price}</h2>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600" onClick={() => setOpenCart(true)}>
            Add to Cart
          </button>
        </div>
      </div>
      {openCart && <AddToCart setOpenCart={setOpenCart} image={image} name={name} rating={rating} price={price} id={item._id}/>}
      {isProductPopupOpen &&
      <ProductDetailsPopup
      isOpen={isProductPopupOpen}
      onClose={() => setIsProductPopupOpen(false)}
      id={item._id}
    />
      }
    </div>
  );
};

export default PopularItem;
