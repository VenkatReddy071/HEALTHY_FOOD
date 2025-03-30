import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { Menu } from "./components/Menu/Menu";
import { Header1 } from "./components/Main/Header";
import { Navbar } from "./components/Main/Navbar";
import ServiceSection from "./components/Service/ServiceSection";
import CheckoutPage from "./components/Cart/CheckOutPage";
import Admin from "./components/Admin/Admin";
const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const AppContent = ({ user }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/Admin";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar user={user} />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Header1 />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/service" element={<ServiceSection />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const url = "http://localhost:3000/api/me";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    orders: [],
    users: [],
    products: [],
  });

  useEffect(() => {
    Axios.get(url, { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });

    const fetchData = async () => {
      try {
        const [ordersResponse, usersResponse, productsResponse] = await Promise.all([
          Axios.get("http://localhost:3000/api/orders"),
          Axios.get("http://localhost:3000/api/users"),
          Axios.get("http://localhost:3000/api/products"),
        ]);

        setData({
          orders: ordersResponse.data,
          users: usersResponse.data,
          products: productsResponse.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hide loader once data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <AppContent user={user} />
    </Router>
  );
};

export default App;
