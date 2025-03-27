import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Earnings = ({ setTotalEarnings }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalEarnings, setTotalEarningsLocal] = useState(0); // Local state for total earnings
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch total earnings from the API
  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (!token) {
        throw new Error("Unauthorized - No token found.");
      }

      const response = await fetch(`${apiUrl}/orders/earnings`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // Add token in headers
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch earnings");
      }

      const data = await response.json();

      if (data.success && typeof data.totalEarnings === "number") {
        setTotalEarningsLocal(data.totalEarnings); // Update local state
        if (typeof setTotalEarnings === "function") {
          setTotalEarnings(data.totalEarnings); // Update total earnings in the parent component
        }
      } else {
        console.error("Unexpected API response:", data);
        toast.error("Unexpected response format from API", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
      setError("Failed to fetch earnings");
      toast.error(error.message || "Failed to fetch earnings", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Earnings</h1>

      {/* Total Earnings Card */}
      <div className="bg-orange-300 text-gray-900 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium">Total Earnings</h2>
        <p className="text-4xl font-bold mt-2">
          ${totalEarnings.toLocaleString()}
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Earnings;