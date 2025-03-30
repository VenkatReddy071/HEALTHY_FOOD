import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import OrderManagement from "./OrderManagement"
import UserManagement from "./userManagement"
import ProductManagement from "./ProductManagement"
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);

  useEffect(() => {
    // Fetch all orders
    axios.get("http://localhost:3000/api/orders/get").then((res) => {
      setOrderData(res.data.data);
    });

    // Fetch all users
    axios.get("http://localhost:3000/api/user").then((res) => {
      setUserData(res.data);
    });

    // Fetch all products
    axios.get("http://localhost:3000/api/").then((res) => {
      setTotalProducts(res.data);
    });
  }, []);

  // Mock data for charts
  const ordersPerDay = [
    { date: "2023-03-25", orders: 10 },
    { date: "2023-03-26", orders: 15 },
    { date: "2023-03-27", orders: 20 },
    { date: "2023-03-28", orders: 5 },
  ];

  const usersByRegion = [
    { name: "North", value: 400 },
    { name: "South", value: 300 },
    { name: "East", value: 200 },
    { name: "West", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-primary text-black flex flex-col p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`py-2 px-4 text-left mb-2 rounded-lg ${
            activeTab === "dashboard" ? "bg-orange-600" : "hover:bg-orange-500"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`py-2 px-4 text-left mb-2 rounded-lg ${
            activeTab === "orders" ? "bg-orange-600" : "hover:bg-orange-500"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`py-2 px-4 text-left mb-2 rounded-lg ${
            activeTab === "users" ? "bg-orange-600" : "hover:bg-orange-500"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`py-2 px-4 text-left mb-2 rounded-lg ${
            activeTab === "products" ? "bg-orange-600" : "hover:bg-orange-500"
          }`}
        >
          Products
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {activeTab === "dashboard" && (
          <div>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-primary text-black p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold">Total Orders</h2>
                <p className="text-4xl mt-2">{orderData?.length}</p>
              </div>
              <div className="bg-primary text-black p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold">Total Users</h2>
                <p className="text-4xl mt-2">{userData?.length}</p>
              </div>
              <div className="bg-primary text-black p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold">Total Products</h2>
                <p className="text-4xl mt-2">{totalProducts?.length}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Orders Per Day */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Orders Per Day</h3>
                <LineChart
                  width={400}
                  height={250}
                  data={ordersPerDay}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                </LineChart>
              </div>

              {/* Users by Region */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Users by Region</h3>
                <PieChart width={400} height={250}>
                  <Pie
                    data={usersByRegion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {usersByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && <><OrderManagement/></>}
        {activeTab === "users" && <><UserManagement/></>}
        {activeTab === "products" && <><ProductManagement/></>}
      </div>
    </div>
  );
};

export default AdminDashboard;
