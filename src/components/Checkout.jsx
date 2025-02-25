// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { applyPromoCode, clearPromoCode } from "../store/promoCodeSlice";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const cart = useSelector((state) => state.cart.items) || []; // Ensure cart is an array
//   const promoCode = useSelector((state) => state.promoCode);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     address: "",
//     email: "",
//     phone: "",
//     additionalInfo: "",
//     sameAsShipping: true,
//     paymentMode: "Cash on Delivery",
//   });

//   const [loading, setLoading] = useState(false);

//   const totalAmount = cart.length > 0
//     ? cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
//     : 0;
//   const discountedAmount = totalAmount - (totalAmount * (promoCode.discount || 0)) / 100;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handlePlaceOrder = async () => {
//     if (!formData.firstName || !formData.address || !formData.email || !formData.phone) {
//       alert("Please fill in all required fields.");
//       return;
//     }
  
//     setLoading(true);
  
//     const orderData = {
//       shippingAddress: {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         companyName: formData.companyName,
//         address: formData.address,
//         email: formData.email,
//         phone: formData.phone,
//         additionalInfo: formData.additionalInfo,
//         sameAsBilling: formData.sameAsShipping,
//       },
//       products: cart.map((item) => ({
//         productId: item.product,
//         title: item.title,
//         frontImage: item.frontImage,
//         price: item.price,
//         size: item.size,
//         color: item.color,
//         logo: item.logo || "",
//         quantity: item.quantity,
//         method: item.method || "Not selected",
//         position: item.position || "Not selected",
//       })),
//       totalAmount,
//       promoCode: promoCode.code || "",
//       discount: promoCode.discount || 0,
//       finalAmount: discountedAmount,
//       paymentMode: formData.paymentMode,
//     };
  
//     try {
//       const response = await fetch("http://localhost:5000/api/orders/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ✅ Include credentials (cookies)
//         body: JSON.stringify(orderData),
//       });
  
//       if (response.ok) {
//         alert("Order placed successfully!");
//         navigate("/success"); // ✅ Redirect to Success Page
//       } else {
//         alert("Failed to place order.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("An error occurred while placing the order.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="checkout-container mx-4 my-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Shipping address</h2>
//           <form>
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="p-2 border rounded"
//               />
//             </div>
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company name"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="p-2 border rounded w-full mb-4"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               className="p-2 border rounded w-full mb-4"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="p-2 border rounded w-full mb-4"
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="p-2 border rounded w-full mb-4"
//             />
//             <textarea
//               name="additionalInfo"
//               placeholder="Additional information"
//               value={formData.additionalInfo}
//               onChange={handleChange}
//               className="p-2 border rounded w-full mb-4"
//             />
//             <div className="mb-4">
//               <input
//                 type="checkbox"
//                 id="sameAsShipping"
//                 name="sameAsShipping"
//                 checked={formData.sameAsShipping}
//                 onChange={handleChange}
//               />
//               <label htmlFor="sameAsShipping" className="ml-2">
//                 Same as shipping address
//               </label>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Payment Method
//               </label>
//               <select
//                 name="paymentMode"
//                 value={formData.paymentMode}
//                 onChange={handleChange}
//                 className="p-2 border rounded w-full"
//               >
//                 <option value="Cash on Delivery">Cash on Delivery</option>
//                 <option value="Online">Online Payment</option>
//               </select>
//             </div>
//           </form>
//         </div>

//         <div>
//           <h2 className="text-lg font-bold text-gray-800 mb-4">The total amount of</h2>
//           <div className="bg-white shadow-lg rounded-md p-4 mb-4">
//             <p className="text-gray-600 text-sm">Total amount: ${totalAmount.toFixed(2)}</p>
//             {promoCode.code && (
//               <p className="text-green-600 text-sm">
//                 Promo code applied: {promoCode.code} ({promoCode.discount || 0}% off)
//               </p>
//             )}
//             <p className="text-gray-800 font-bold text-lg mt-2">
//               The total amount of (including VAT): ${discountedAmount.toFixed(2)}
//             </p>
//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
//             >
//               {loading ? "Placing Order..." : "PLACE ORDER"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyPromoCode, clearPromoCode } from "../store/promoCodeSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items) || []; // Ensure cart is an array
  const promoCode = useSelector((state) => state.promoCode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
    additionalInfo: "",
    sameAsShipping: true,
    paymentMode: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);

  const totalAmount = cart.length > 0
    ? cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
    : 0;
  const discountedAmount = totalAmount - (totalAmount * (promoCode.discount || 0)) / 100;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.address || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
  
    setLoading(true);

    const token = localStorage.getItem("authToken"); // ✅ Get Token from Local Storage

    if (!token) {
      console.error("❌ No auth token found! Redirecting to login.");
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }
  
    const orderData = {
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        additionalInfo: formData.additionalInfo,
        sameAsBilling: formData.sameAsShipping,
      },
      products: cart.map((item) => ({
        productId: item.product,
        title: item.title,
        frontImage: item.frontImage,
        price: item.price,
        size: item.size,
        color: item.color,
        logo: item.logo || "",
        quantity: item.quantity,
        method: item.method || "Not selected",
        position: item.position || "Not selected",
      })),
      totalAmount,
      promoCode: promoCode.code || "",
      discount: promoCode.discount || 0,
      finalAmount: discountedAmount,
      paymentMode: formData.paymentMode,
    };

    console.log("🚀 Order Data:", orderData); // ✅ Debugging Log
  
    try {
      const response = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include Bearer Token
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (response.status === 401) {
        console.error("❌ Unauthorized access - Token expired.");
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken"); // 🔹 Remove expired token
        navigate("/login");
        return;
      }
  
      if (response.ok) {
        alert("🎉 Order placed successfully!");
        navigate("/success");
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to place order:", errorData);
        alert(errorData.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="checkout-container mx-4 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-2 border rounded" />
            </div>
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="p-2 border rounded w-full mb-4" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="p-2 border rounded w-full mb-4" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded w-full mb-4" />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded w-full mb-4" />
            <textarea name="additionalInfo" placeholder="Additional Information" value={formData.additionalInfo} onChange={handleChange} className="p-2 border rounded w-full mb-4" />
            <div className="mb-4">
              <input type="checkbox" id="sameAsShipping" name="sameAsShipping" checked={formData.sameAsShipping} onChange={handleChange} />
              <label htmlFor="sameAsShipping" className="ml-2">Same as shipping address</label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="p-2 border rounded w-full">
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">The Total Amount</h2>
          <div className="bg-white shadow-lg rounded-md p-4 mb-4">
            <p className="text-gray-600 text-sm">Total Amount: ${totalAmount.toFixed(2)}</p>
            {promoCode.code && <p className="text-green-600 text-sm">Promo Code Applied: {promoCode.code} ({promoCode.discount || 0}% off)</p>}
            <p className="text-gray-800 font-bold text-lg mt-2">Total (Including VAT): ${discountedAmount.toFixed(2)}</p>
            <button onClick={handlePlaceOrder} disabled={loading} className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300">
              {loading ? "Placing Order..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
