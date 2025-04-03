import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [viewedOrders, setViewedOrders] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Unauthorized - No token found");
      }

      const response = await fetch(`${apiUrl}/orders`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please log in again.");
        } else {
          throw new Error("Failed to fetch orders");
        }
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        toast.error("Unexpected response format from API", { position: "top-right" });
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const isNewOrder = (createdAt, orderId) => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return new Date(createdAt) > oneDayAgo && !viewedOrders.has(orderId);
  };

  const handleOrderClick = (orderId) => {
    setViewedOrders((prev) => new Set([...prev, orderId]));
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort orders (new orders first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aNew = isNewOrder(a.createdAt, a._id);
    const bNew = isNewOrder(b.createdAt, b._id);
    return bNew - aNew;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">#</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Total Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
              <th className="px-4 py-2 text-left text-sm font-medium">New</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, index) => (
              <tr
                key={order._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } ${isNewOrder(order.createdAt, order._id) ? "bg-yellow-100 font-bold" : "hover:bg-gray-100"}`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-blue-500 hover:underline"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    {order._id}
                  </Link>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-2 text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">${order.finalAmount.toFixed(2)}</td>
                <td className="px-4 py-2 text-sm">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-blue-500 hover:underline"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    View Details
                  </Link>
                </td>
                <td className="px-4 py-2 text-sm text-green-600 font-bold">
                  {isNewOrder(order.createdAt, order._id) ? "New" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Orders;