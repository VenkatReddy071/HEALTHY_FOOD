import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import CartModal from "../Cart/Cart";
import Logo from "../../assets/logo.png";
import { Login } from "./Login";
export const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false); 
  const [showLogin, setShowLogin] = useState(false); // For login modal
  const [dropdownOpen, setDropdownOpen] = useState(false); // For user dropdown
  const [openCart,setOpenCart]=useState(false)
  const [cart,setCart]=useState([])
  const [add,setAdd]=useState(false)
  useEffect(() => {
      handleCart();
    }, [add===true]);
  
    const handleCart = () => {
      Axios.get("https://healthy-food-1.onrender.com/api/cart", { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          setCart(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  const NavLink = ({ label, to, onClick }) => (
    <li
      onClick={onClick}
      className={`hover:text-orange-500 cursor-pointer text-xl p-2 ${open && "border-b-2"}`}
    >
      <Link to={to}>{label}</Link>
    </li>
  );
  const handleLogOut=()=>{
    Axios.post("https://healthy-food-1.onrender.com/api/logout")
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="px-4 py-2 flex justify-between items-center shadow-md bg-white h-20 md:m-2">
      {/* Logo Section */}
      <Link to={"/"}>
      <div className="h-auto md:w-28 w-24">
        <img src={Logo} alt="Logo" className="h-full w-full object-contain" />
      </div>
      </Link>
    

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6 text-black font-semibold">
        <ul className="flex space-x-6">
          <NavLink label="Home" to="/" />
          <NavLink label="Menu" to="/menu" />
          <NavLink label="Service" to="/service" />
          <button
          onClick={() => window.open("/Admin", "_blank")}
          className="hover:text-orange-500 cursor-pointer text-xl p-2"
        >
          Admin
        </button>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-x-4 md:flex items-center flex gap-2">
        {user ? (
          <div className="z-50">
            <FaUser
              className="text-2xl cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => console.log("Go to Profile")}
                >
                  <span className="text-black font-semibold">{user.username}</span>
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => console.log("Go to Orders")}
                >
                  Orders
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="md:w-24 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            onClick={() => setShowLogin(!showLogin)}
          >
            Sign
          </button>
        )}
        <div className="relative" >
          <GrCart aria-label="Shopping Cart" className="text-3xl cursor-pointer" onClick={()=>setOpenCart(true)}/>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cart && cart.length > 0 ? cart.length:0}
          </span>
        </div>

        {/* Hamburger Menu */}
        <RiMenu3Line
          size={30}
          className="md:hidden w-10 h-10 rounded-full cursor-pointer bg-orange-500 p-2 text-white"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-0 right-0 bg-white w-2/3 px-6 py-4 h-full shadow-lg z-50 transition-transform transform translate-x-0">
          <IoMdClose
            size={30}
            className="absolute top-4 right-4 text-black cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <ul className="mt-12 space-y-6 text-black text-xl border-b-2">
            <NavLink label="Home" to="/" onClick={() => setOpen(false)} />
            <NavLink label="Menu" to="/menu" onClick={() => setOpen(false)} />
            <NavLink label="Service" to="/service" onClick={() => setOpen(false)} />
            <button
          onClick={() => window.open("/Admin", "_blank")}
          className="hover:text-orange-500 cursor-pointer text-xl p-2"
        >
          Admin
        </button>
          </ul>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Login setShowLogin={setShowLogin} />
        </div>
      )}
      {openCart &&
      <CartModal setOpenCart={setOpenCart} cart={cart} add={setAdd}/>
      }
    </div>
  );
};
