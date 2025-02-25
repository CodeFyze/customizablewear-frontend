import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  FaBox, FaShoppingCart, FaPalette, FaRuler, FaImage, FaMoneyBillWave,
  FaMapMarkerAlt, FaCheckCircle, FaInfoCircle, FaEllipsisV, FaEye, FaDownload
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const API_URL = `http://localhost:5000/api/orders/orders/${orderId}`;

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("authToken"); // ✅ Get token from localStorage

      if (!token) {
        throw new Error("Unauthorized - No token found.");
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add token in headers
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

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "custom-logo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image. Please try again.", { position: "top-right" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* ✅ Order Header */}
        <div className="flex justify-between items-center bg-blue-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FaBox className="mr-2" /> Order Details
          </h1>
          <p className="text-lg flex items-center">
            <FaInfoCircle className="mr-2" /> Order ID:
            <span className="font-semibold ml-1">{order._id}</span>
          </p>
        </div>





 {/* ✅ Order Status & Payment Info */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCheckCircle className="mr-2 text-green-600" /> Order Status
            </h2>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Status:</span> 
              <span className={`ml-2 px-3 py-1 rounded-full text-white ${
                order.status === "Delivered" ? "bg-green-500" :
                order.status === "Pending" ? "bg-blue-500" :
                order.status === "Cancelled" ? "bg-red-500" : "bg-gray-500"
              }`}>
                {order.status}
              </span>
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Payment Mode:</span> {order.paymentMode}
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Payment Status:</span> 
              <span className={`ml-2 px-3 py-1 rounded-full text-white ${
                order.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500"
              }`}>
                {order.paymentStatus}
              </span>
            </p>
          </div>
        </div>

        {/* ✅ Products List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaShoppingCart className="mr-2" /> Products Ordered
          </h2>
          {order.products.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 relative">
              <div className="flex items-center">
                <img src={item.frontImage} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500 flex items-center">
  <FaPalette className="mr-2" /> Color:
  <span 
    className="w-5 h-5 inline-block ml-2 border border-gray-400 rounded-full"
    style={{ backgroundColor: item.color }}
  ></span>
</p>

                  <p className="text-sm text-gray-500 flex items-center"><FaRuler className="mr-2" /> Size: {item.size}</p>
                  <p className="text-sm text-gray-500 flex items-center"><FaCheckCircle className="mr-2" /> Method: {item.method}</p>
                  <p className="text-sm text-gray-500 flex items-center"><FaCheckCircle className="mr-2" /> Position: {item.position}</p>
                  <p className="text-sm text-gray-500 flex items-center"><FaShoppingCart className="mr-2" /> Quantity: {item.quantity}</p>
                </div>
              </div>
              {item.logo && (
                <div className="mt-6 relative">
                  <h2 className="text-sm font-bold text-gray-800">Custom Logo:</h2>
                  <div className="flex items-center space-x-4">
                    <img src={item.logo} alt="Custom Logo" className="w-32 h-32 object-cover rounded-md border" />
                    {/* Three-dot menu */}
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                        className="text-gray-600 hover:text-gray-800">
                        <FaEllipsisV size={18} />
                      </button>
                      {menuOpen === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                          <button
                            onClick={() => window.open(item.logo, "_blank")}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaEye className="mr-2" /> View Image
                          </button>
                          <button
                            onClick={() => handleDownload(item.logo)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaDownload className="mr-2" /> Download Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FaMapMarkerAlt className="mr-2" /> Shipping Address</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">Email: {order.shippingAddress.email}</p>
            <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderDetails;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   FaBox, FaShoppingCart, FaPalette, FaRuler, FaImage, FaMoneyBillWave,
//   FaMapMarkerAlt, FaCheckCircle, FaInfoCircle, FaEllipsisV, FaEye, FaDownload
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(null);

//   const API_URL = `http://localhost:5000/api/orders/orders/${orderId}`;

//   const fetchOrderDetails = async () => {
//     try {
//       const token = localStorage.getItem("authToken"); // ✅ Get token from localStorage

//       if (!token) {
//         throw new Error("Unauthorized - No token found.");
//       }

//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Add token in headers
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch order details");
//       }

//       const data = await response.json();
//       setOrder(data.order);
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//       setError(error.message || "Failed to fetch order details");
//       toast.error(error.message, { position: "top-right" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]);

//   const handleDownload = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "custom-logo.png";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading image:", error);
//       toast.error("Failed to download image. Please try again.", { position: "top-right" });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-2xl font-semibold text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         {/* ✅ Order Header */}
//         <div className="flex justify-between items-center bg-blue-600 text-white rounded-lg p-6">
//           <h1 className="text-2xl font-bold flex items-center">
//             <FaBox className="mr-2" /> Order Details
//           </h1>
//           <p className="text-lg flex items-center">
//             <FaInfoCircle className="mr-2" /> Order ID:
//             <span className="font-semibold ml-1">{order._id}</span>
//           </p>
//         </div>

//         {/* ✅ Order Status & Payment Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <FaCheckCircle className="mr-2 text-green-600" /> Order Status
//             </h2>
//             <p className="text-gray-600 text-lg">
//               <span className="font-semibold">Status:</span> 
//               <span className={`ml-2 px-3 py-1 rounded-full text-white ${
//                 order.status === "Delivered" ? "bg-green-500" :
//                 order.status === "Pending" ? "bg-blue-500" :
//                 order.status === "Cancelled" ? "bg-red-500" : "bg-gray-500"
//               }`}>
//                 {order.status}
//               </span>
//             </p>
//             <p className="text-gray-600 text-lg">
//               <span className="font-semibold">Payment Mode:</span> {order.paymentMode}
//             </p>
//             <p className="text-gray-600 text-lg">
//               <span className="font-semibold">Payment Status:</span> 
//               <span className={`ml-2 px-3 py-1 rounded-full text-white ${
//                 order.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500"
//               }`}>
//                 {order.paymentStatus}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* ✅ Products List */}
//         <div className="mt-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <FaShoppingCart className="mr-2" /> Products Ordered
//           </h2>
//           {order.products.map((item, index) => (
//             <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 relative">
//               <div className="flex items-center">
//                 <img src={item.frontImage} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-4" />
//                 <div>
//                   <p className="text-lg font-semibold">{item.title}</p>
//                   <p className="text-sm text-gray-500"><FaRuler className="mr-2" /> Size: {item.size}</p>
//                   <p className="text-sm text-gray-500"><FaCheckCircle className="mr-2" /> Method: {item.method}</p>
//                   <p className="text-sm text-gray-500"><FaCheckCircle className="mr-2" /> Position: {item.position}</p>
//                   <p className="text-sm text-gray-500"><FaShoppingCart className="mr-2" /> Quantity: {item.quantity}</p>
//                 </div>
//               </div>
//               {item.logo && (
//                 <div className="mt-6">
//                   <h2 className="text-sm font-bold text-gray-800">Custom Logo:</h2>
//                   <div className="flex items-center space-x-4">
//                     <img src={item.logo} alt="Custom Logo" className="w-32 h-32 object-cover rounded-md border" />
//                     <button onClick={() => handleDownload(item.logo)}
//                       className="text-blue-600 hover:underline flex items-center">
//                       <FaDownload className="mr-2" /> Download
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default OrderDetails;
