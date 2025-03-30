import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the backend
    axios
      .get("https://healthy-food-1.onrender.com/api/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        alert("Failed to fetch products.");
      });
  }, []);

  const toggleAvailability = async (productId, currentStatus) => {
    try {
      await axios.post(`https://healthy-food-1.onrender.com/api/${productId}`, {
        isAvailable: !currentStatus,
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, isAvailable: !currentStatus }
            : product
        )
      );
      alert("Product availability updated successfully.");
    } catch (err) {
      console.error("Error updating availability:", err);
      alert("Failed to update product availability.");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://healthy-food-1.onrender.com/api/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      alert("Product deleted successfully.");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Product Name</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Category</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Price</th>
              <th className="py-3 px-6 text-center font-medium text-gray-600">Available</th>
              <th className="py-3 px-6 text-center font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 text-gray-700">{product.name}</td>
                <td className="py-4 px-6 text-gray-700">{product.category}</td>
                <td className="py-4 px-6 text-gray-700">₹{product.price}</td>
                <td className="py-4 px-6 text-center">
                  <input
                    type="checkbox"
                    checked={product.isAvailable}
                    onChange={() => toggleAvailability(product._id, product.isAvailable)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
