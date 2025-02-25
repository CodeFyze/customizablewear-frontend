// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Earnings = ({ setTotalEarnings }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = "http://localhost:5000/api/orders"; // API URL for fetching orders

//   // Fetch orders from the API
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(`${API_URL}`, {
//         credentials: "include",
//         method: "GET",
//       });

//       if (!response.ok) throw new Error("Failed to fetch orders");
//       const data = await response.json();

//       if (data.success && Array.isArray(data.orders)) {
//         setOrders(data.orders);
//         // Calculate total earnings and pass it to the parent component
//         const totalEarnings = data.orders.reduce((total, order) => {
//           const amount = parseFloat(order.totalAmount);
//           return total + amount;
//         }, 0);
//         setTotalEarnings(totalEarnings); // Update total earnings in the parent component
//       } else {
//         console.error("Unexpected API response:", data);
//         toast.error("Unexpected response format from API", { position: "top-right" });
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to fetch orders");
//       toast.error("Failed to fetch orders", { position: "top-right" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-600">{error}</div>;
//   }

//   // Calculate earnings by month (for table)
//   const earningsByMonth = orders.reduce((acc, order) => {
//     const month = new Date(order.createdAt).toLocaleString("default", { month: "long" });
//     const earnings = parseFloat(order.totalAmount);

//     if (!acc[month]) {
//       acc[month] = 0;
//     }

//     acc[month] += earnings;
//     return acc;
//   }, {});

//   // Convert earningsByMonth into an array for rendering
//   const monthlyEarnings = Object.entries(earningsByMonth).map(([month, earnings]) => ({
//     month,
//     earnings: `$${earnings.toFixed(2)}`,
//   }));

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Earnings</h1>

//       {/* Total Earnings Card */}
//       <div className="bg-orange-300 text-gray-900 rounded-lg shadow p-6 mb-6">
//         <h2 className="text-lg font-medium">Total Earnings</h2>
//         <p className="text-4xl font-bold mt-2">
//           ${orders.reduce((total, order) => {
//             const amount = parseFloat(order.totalAmount);
//             return total + amount;
//           }, 0).toLocaleString()}
//         </p>
//       </div>

//       {/* Earnings Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="w-full table-auto">
//           <thead className="bg-orange-300 text-white">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium">Month</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Earnings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {monthlyEarnings.map((entry, index) => (
//               <tr
//                 key={index}
//                 className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
//               >
//                 <td className="px-4 py-3 text-gray-700 text-sm">{entry.month}</td>
//                 <td className="px-4 py-3 text-gray-700 text-sm">{entry.earnings}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Earnings;


import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Earnings = ({ setTotalEarnings }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/orders"; // API URL for fetching orders

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken"); // ✅ Get token from localStorage

      if (!token) {
        throw new Error("Unauthorized - No token found.");
      }

      const response = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add token in headers
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        // Calculate total earnings and pass it to the parent component
        const totalEarnings = data.orders.reduce((total, order) => {
          const amount = parseFloat(order.totalAmount);
          return total + amount;
        }, 0);
        setTotalEarnings(totalEarnings); // Update total earnings in the parent component
      } else {
        console.error("Unexpected API response:", data);
        toast.error("Unexpected response format from API", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
      toast.error(error.message || "Failed to fetch orders", { position: "top-right" });
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

  // Calculate earnings by month (for table)
  const earningsByMonth = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString("default", { month: "long" });
    const earnings = parseFloat(order.totalAmount);

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += earnings;
    return acc;
  }, {});

  // Convert earningsByMonth into an array for rendering
  const monthlyEarnings = Object.entries(earningsByMonth).map(([month, earnings]) => ({
    month,
    earnings: `$${earnings.toFixed(2)}`,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Earnings</h1>

      {/* Total Earnings Card */}
      <div className="bg-orange-300 text-gray-900 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium">Total Earnings</h2>
        <p className="text-4xl font-bold mt-2">
          ${orders.reduce((total, order) => {
            const amount = parseFloat(order.totalAmount);
            return total + amount;
          }, 0).toLocaleString()}
        </p>
      </div>

      {/* Earnings Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-orange-300 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Month</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {monthlyEarnings.map((entry, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-gray-700 text-sm">{entry.month}</td>
                <td className="px-4 py-3 text-gray-700 text-sm">{entry.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Earnings;
