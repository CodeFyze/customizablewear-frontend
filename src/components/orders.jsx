import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/orders";

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken"); // ✅ Get stored auth token

      if (!token) {
        throw new Error("Unauthorized - No token found");
      }

      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send Token in Headers
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
        console.error("Unexpected API response:", data);
        toast.error("Unexpected response format from API", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message);
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Total Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline">
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
                  {order.status}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">${order.finalAmount.toFixed(2)}</td>
                <td className="px-4 py-2 text-sm">
                  <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ensure ToastContainer is included properly */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Orders;
