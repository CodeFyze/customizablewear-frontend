import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link for navigation
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/orders"; // API URL for fetching orders

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        credentials: 'include', // Ensure credentials are included for authenticated requests
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        console.error("Unexpected API response:", data);
        toast.error("Unexpected response format from API", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
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
              <th className="px-4 py-2 text-left text-sm font-medium">Product</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                {/* Wrap the row with a Link component to navigate to the order details page */}
                <Link to={`/orders/${order._id}`}>
                  <td className="px-4 py-2 text-sm text-gray-700">{order._id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.product}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
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
                  <td className="px-4 py-2 text-sm text-gray-700">${order.totalAmount}</td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Orders;
