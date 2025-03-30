// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Select, Tag, message } from "antd";

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Fetch all orders from the backend
//     axios
//       .get("http://localhost:3000/api/orders")
//       .then((res) => {
//         setOrders(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         message.error("Failed to fetch orders.");
//       });
//   }, []);

//   const deleteOrder = async (orderId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
//       setOrders((prevOrders) =>
//         prevOrders.filter((order) => order._id !== orderId)
//       );
//       message.success("Order deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting order:", err);
//       message.error("Failed to delete order.");
//     }
//   };

//   const openEditModal = (order) => {
//     setEditingOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleEdit = async (values) => {
//     try {
//       const updatedOrder = await axios.patch(
//         `http://localhost:3000/api/orders/${editingOrder._id}`,
//         values
//       );
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === editingOrder._id ? updatedOrder.data : order
//         )
//       );
//       message.success("Order updated successfully.");
//       setIsModalOpen(false);
//       setEditingOrder(null);
//     } catch (err) {
//       console.error("Error updating order:", err);
//       message.error("Failed to update order.");
//     }
//   };

//   const getStatusTag = (status) => {
//     switch (status) {
//       case "Processing":
//         return <Tag color="blue">Processing</Tag>;
//       case "Out for Delivery":
//         return <Tag color="orange">Out for Delivery</Tag>;
//       case "Delivered":
//         return <Tag color="green">Delivered</Tag>;
//       case "Cancelled":
//         return <Tag color="red">Cancelled</Tag>;
//       default:
//         return <Tag color="gray">Unknown</Tag>;
//     }
//   };

//   const columns = [
//     {
//       title: "Order ID",
//       dataIndex: "_id",
//       key: "_id",
//     },
//     {
//       title: "User Name",
//       dataIndex: "user",
//       key: "user",
//       render: (user) => user?.name,
//     },
//     {
//       title: "Order Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => getStatusTag(status), // Use themed tags for status
//     },
//     {
//       title: "Total Amount",
//       dataIndex: "total",
//       key: "total",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <>
//           <Button
//             type="primary"
//             onClick={() => openEditModal(record)}
//             className="mr-2"
//           >
//             Edit
//           </Button>
//           <Button type="danger" onClick={() => deleteOrder(record._id)}>
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Order Management</h1>
//       <Table
//         dataSource={orders}
//         columns={columns}
//         rowKey={(record) => record._id}
//         bordered
//         pagination={{ pageSize: 8 }}
//       />
//       <Modal
//         title="Edit Order"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Select
//           placeholder="Select Status"
//           defaultValue={editingOrder?.status}
//           onChange={(value) =>
//             handleEdit({ status: value })
//           }
//           style={{ width: "100%" }}
//         >
//           <Select.Option value="Processing">Processing</Select.Option>
//           <Select.Option value="Out for Delivery">Out for Delivery</Select.Option>
//           <Select.Option value="Delivered">Delivered</Select.Option>
//           <Select.Option value="Cancelled">Cancelled</Select.Option>
//         </Select>
//       </Modal>
//     </div>
//   );
// };

// export default OrderManagement;


import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders/get")
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        alert("Failed to fetch orders.");
      });
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      alert("Order deleted successfully.");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order.");
    }
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setStatus(order.status);
    setIsModalOpen(true);
  };

  const handleEdit = async () => {
    try {
      const updatedOrder = await axios.post(
        `http://localhost:3000/api/orders/${editingOrder._id}/status`,
        { status }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === editingOrder._id ? updatedOrder.data : order
        )
      );
      alert("Order updated successfully.");
      setIsModalOpen(false);
      setEditingOrder(null);
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">User Name</th>
              <th className="py-3 px-6">Order Status</th>
              <th className="py-3 px-6">Total Amount</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-100 transition"
              >
                <td className="py-3 px-6">{order._id}</td>
                <td className="py-3 px-6">{order.user?.username}</td>
                <td className="py-3 px-6">{order.status}</td>
                <td className="py-3 px-6">${order.total?.toFixed(2)}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => openEditModal(order)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
            <label className="block mb-4">
              <span className="text-gray-700">Order Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full mt-1 p-2 border rounded-md shadow-sm"
              >
                <option value="Processing">Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
