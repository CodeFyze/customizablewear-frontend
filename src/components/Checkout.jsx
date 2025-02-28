import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items) || [];
  const promoCode = useSelector((state) => state.promoCode);
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

  const totalAmount = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const discountedAmount =
    totalAmount - (totalAmount * (promoCode.discount || 0)) / 100;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Function to group duplicate products before placing an order
  const getGroupedProducts = () => {
    return cart.reduce((acc, item) => {
      const existingProduct = acc.find(
        (p) => p.productId === item.product?._id?.toString()
      );

      if (existingProduct) {
        existingProduct.quantity += item.quantity || 1;
      } else {
        acc.push({
          productId: item.product?._id?.toString() || "UNKNOWN_ID",
          title: item.title || "Untitled Product",
          frontImage: item.frontImage || "",
          price: item.price || 0,
          size: item.size || "Default",
          color: item.color || "Default",
          logo: item.logo || "",
          quantity: item.quantity || 1,
          method: item.method || "Not selected",
          position: item.position || "Not selected",
        });
      }
      return acc;
    }, []);
  };

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.address || !formData.email || !formData.phone) {
      alert("❌ Please fill in all required fields.");
      console.log("Missing Fields:", formData);
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("❌ No auth token found! Redirecting to login.");
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const orderData = {
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName || "N/A",
        companyName: formData.companyName || "N/A",
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        additionalInfo: formData.additionalInfo || "",
        sameAsBilling: formData.sameAsShipping,
      },
      products: getGroupedProducts(),
      totalAmount,
      promoCode: promoCode.code || "",
      discount: promoCode.discount || 0,
      finalAmount: discountedAmount,
      paymentMode: formData.paymentMode,
    };

    console.log("🚀 Sending Order Data:", JSON.stringify(orderData, null, 2));

    try {
      const response = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();

      if (response.status === 401) {
        console.error("❌ Unauthorized access - Token expired.");
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      if (response.ok) {
        alert("🎉 Order placed successfully!");
        navigate("/success");
      } else {
        console.error("❌ Order placement failed:", responseData);
        alert(responseData.message || "Failed to place order.");
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
