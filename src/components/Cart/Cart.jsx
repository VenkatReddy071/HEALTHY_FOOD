// import React, { useState,useEffect } from "react";
// import Axios from "axios"
// const CartModal = ({ cartItems, setOpenCart }) => {
//   // Calculate total price
//   const [cart,setCart]=useState([]);

//   const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
//   useEffect(()=>{
//     handleCart();
//   },[])
//   const handleCart=()=>{
//     Axios.get("http://localhost:3000/api/cart",{ withCredentials: true })
//     .then((response)=>{
//       console.log(response.data)
//       setCart(response.data.items)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-96 p-4 relative">
//         {/* Close Button */}
//         <button
//           onClick={() => setOpenCart(false)}
//           className="absolute top-2 right-2 rotate-45 text-gray-500 hover:text-gray-800"
//         >
//           ✖
//         </button>

//         {/* Cart Header */}
//         <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
//           Your Cart
//         </h2>

//         {cartItems.length > 0 ? (
//           <>
//             {/* Scrollable List */}
//             <div className="max-h-72 overflow-y-auto space-y-4">
//               {cartItems.map((item, index) => (
//                 <div key={index} className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4">
//                   {/* Item Image */}
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   {/* Item Details */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {item.name}
//                     </h3>
//                     <p className="text-gray-600 mt-1">${item.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Total Price and Checkout */}
//             <div className="mt-4">
//               <div className="flex justify-between text-lg font-semibold text-gray-800">
//                 <span>Total:</span>
//                 <span>${totalPrice.toFixed(2)}</span>
//               </div>
//               <button
//                 className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600"
//                 onClick={() => alert("Proceeding to checkout...")}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-600">Your cart is empty!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartModal;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import CheckOutPage from "./CheckOutPage"
import {Link} from "react-router-dom"
const CartModal = ({ setOpenCart,cart,add }) => {

  
  useEffect(()=>{
    add(true)
  },[])
  // Calculate total price dynamically based on fetched cart items
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-4 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpenCart(false)}
          className="absolute top-2 right-2 rotate-45 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Cart Header */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Your Cart
        </h2>

        {cart.length > 0 ? (
          <>
            {/* Scrollable List */}
            <div className="max-h-72 overflow-y-auto space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4">
                  {/* Item Image */}
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  {/* Item Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mt-1">${item.price}</p>
                    <p className="text-gray-600 mt-1">Quantity : {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price and Checkout */}
            <div className="mt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Link to={"/checkout"}>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Proceed to Checkout
              </button>
              </Link>
            
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Your cart is empty!</p>
        )}
      </div>
      <div>
        
        
      </div>
    </div>
  );
};

export default CartModal;
