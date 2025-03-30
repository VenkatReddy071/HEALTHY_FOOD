import React, { useState,useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [cartItems,setCartItems]=useState([]);

  useEffect(() => {
        handleCart();
},[]);
    
      const handleCart = () => {
        Axios.get("http://localhost:3000/api/cart", { withCredentials: true })
          .then((response) => {
            console.log(response.data);
            setCartItems(response.data.items);
          })
          .catch((error) => {
            console.log(error);
          });
        }
    
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

 
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Place order
  const placeOrder = () => {
    

    setLoading(true);
    toast.info("Placing your order...");

    Axios.post("http://localhost:3000/api/orders", {items: cartItems},{withCredentials:true})
      .then((response) => {
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to place order: ${error.response?.data?.message || "Unknown error"}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="checkout-page p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {/* Cart Summary */}
      <div className="cart-summary mb-6">
        <h3 className="text-lg font-medium">Order Summary</h3>
        <ul className="mt-2 mb-4 space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* User Details Form */}
     

      {/* Place Order Button */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className={`w-full py-2 px-4 rounded ${loading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>

      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
