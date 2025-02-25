import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerOrders = () => {
  const { customerId } = useParams(); // ✅ Get customer ID from URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `http://localhost:5000/api/orders/order-user/${customerId}`;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Unauthorized - Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch orders");

        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Order History</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="p-6 bg-white shadow-lg rounded-lg">
              {/* ✅ Order Details (Above) */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                  <p className="text-gray-600">Status: <span className={`font-medium ${order.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>{order.status}</span></p>
                  <p className="text-gray-600">Total Amount: <span className="font-semibold">${order.finalAmount.toFixed(2)}</span></p>
                  <p className="text-gray-600">Payment: <span className="font-semibold">{order.paymentMode} ({order.paymentStatus})</span></p>
                  <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* ✅ Products (Horizontally Arranged) */}
              <div className="flex gap-6 overflow-x-auto mt-4 p-2">
                {order.products.map((product) => (
                  <div key={product.productId} className="min-w-[250px] border p-4 rounded-lg bg-gray-50 shadow-md flex-shrink-0">
                    <img src={product.frontImage} alt={product.title} className="w-full h-32 object-cover rounded-md" />
                    <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                    <p className="text-gray-600">Price: <span className="font-semibold">${product.price.toFixed(2)}</span></p>
                    <p className="text-gray-600">Size: <span className="font-semibold">{product.size}</span></p>
                    <p className="text-gray-600">Color: <span className="font-semibold" style={{ color: product.color }}>⬤</span></p>
                    <p className="text-gray-600">Method: <span className="font-semibold">{product.method}</span></p>
                    <p className="text-gray-600">Position: <span className="font-semibold">{product.position}</span></p>
                    {product.logo && (
                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-gray-700">Logo:</h5>
                        <img src={product.logo} alt="Logo" className="w-16 h-16 rounded-md mt-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found for this customer.</p>
      )}
    </div>
  );
};

export default CustomerOrders;
