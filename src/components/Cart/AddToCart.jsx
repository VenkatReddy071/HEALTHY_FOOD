import React, { useState } from 'react';
import Axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const AddToCart = ({ setOpenCart, image, name, rating, price,id }) => {
  const [quantity, setQuantity] = useState(1);

  const totalAmount = price * quantity;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleToAdd=()=>{
    toast.success("Added to Cart !")
    Axios.post("https://healthy-food-1.onrender.com/api/cart",{productId:id,quantity},{ withCredentials:true})
    .then((response)=>{
    
      console.log(response.data)

    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className='fixed inset-0 bg-orange-100 bg-opacity-30 flex mt-24 justify-center z-50'>
      <div className="bg-white md:w-full md:max-w-3xl w-90 rounded-2xl shadow-2xl p-6 m-4 h-[50vh] md:h-auto overflow-y-scroll">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add to Cart</h2>
          <button
            className="text-gray-500 hover:text-red-500 text-3xl"
            onClick={() => setOpenCart(false)}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          {/* Item Image */}
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="rounded-xl shadow-md w-full md:w-64 object-cover"
            />
          </div>

          {/* Item Details */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-500 mt-1">Rating: ⭐ {rating}</p>
            <p className="text-gray-500 mt-1">Price: ₹{price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full text-xl"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full text-xl"
              >
                +
              </button>
            </div>

            {/* Total Amount */}
            <div className="mt-6">
              <p className="text-lg font-bold text-gray-800">
                Total: ₹{totalAmount}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setOpenCart(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
                onClick={()=>handleToAdd()}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
