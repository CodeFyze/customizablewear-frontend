import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams to get the orderId from the URL
import { toast, ToastContainer } from "react-toastify"; // Add toasts for user feedback
import "react-toastify/dist/ReactToastify.css"; // Include ToastContainer

const OrderDetails = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `http://localhost:5000/api/orders/orders/${orderId}`; // API URL for fetching order details

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch order details");
      }
  
      const data = await response.json();
      setOrder(data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError(error.message || "Failed to fetch order details");
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="flex justify-center py-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Order Details</h1>
        
        {/* Card body with order details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-700">Order ID:</p>
            <p className="text-xl text-gray-900">{order._id}</p>
          </div>
          <div className="p-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-700">Product:</p>
            <p className="text-xl text-gray-900">{order.product}</p>
          </div>
          <div className="p-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-700">Status:</p>
            <p className="text-xl text-gray-900">{order.status}</p>
          </div>
          <div className="p-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-700">Total Amount:</p>
            <p className="text-xl text-gray-900">${order.totalAmount}</p>
          </div>
          <div className="p-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-700">Order Date:</p>
            <p className="text-xl text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Toast container for feedback */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default OrderDetails;
