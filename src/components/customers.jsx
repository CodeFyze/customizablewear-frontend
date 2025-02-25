import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Hook for navigation
  const API_URL = "http://localhost:5000/api/orders/customers";

  useEffect(() => {
    const fetchCustomers = async () => {
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
        if (!response.ok) throw new Error(data.message || "Failed to fetch customers");

        setCustomers(data.customers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // ✅ Function to handle navigation to the order history page
  const viewOrderHistory = (customerId) => {
    navigate(`/customers/${customerId}/orders`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Customers</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && customers.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Orders</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 cursor-pointer`}
                  onClick={() => viewOrderHistory(customer.id)} // ✅ Navigate on click
                >
                  <td className="px-4 py-3 text-gray-700 text-sm">{customer.id}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{customer.name}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{customer.email}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{customer.phone}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{customer.orders}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${customer.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {customer.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && customers.length === 0 && <p className="text-center text-gray-500">No customers found.</p>}
    </div>
  );
};

export default Customers;
