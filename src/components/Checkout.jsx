import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyPromoCode, clearPromoCode } from "../store/promoCodeSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const promoCode = useSelector((state) => state.promoCode);
  const dispatch = useDispatch();
  const [promoCodeInput, setPromoCodeInput] = useState("");

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountedAmount = totalAmount - (totalAmount * promoCode.discount) / 100;

  const handlePromoCodeChange = (e) => {
    setPromoCodeInput(e.target.value);
  };

  const handleApplyPromoCode = () => {
    dispatch(applyPromoCode({ code: promoCodeInput }));
  };

  const handleClearPromoCode = () => {
    dispatch(clearPromoCode());
    setPromoCodeInput("");
  };

  return (
    // Added responsive padding and max-width container
    <div className="checkout-container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Improved grid layout with responsive gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Shipping Section */}
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shipping address</h2>
          <form className="space-y-4">
            {/* Responsive name fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Last name"
                className="p-2 border rounded w-full"
              />
            </div>
            
            {/* Full width fields with consistent spacing */}
            <input
              type="text"
              placeholder="Company name"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Address"
              className="p-2 border rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded w-full"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="p-2 border rounded w-full"
            />
            <textarea
              placeholder="Additional information"
              className="p-2 border rounded w-full min-h-[100px]"
            ></textarea>
            
            {/* Improved checkbox spacing */}
            <div className="flex items-center py-2">
              <input type="checkbox" id="sameAsShipping" className="w-4 h-4" />
              <label htmlFor="sameAsShipping" className="ml-3 text-sm sm:text-base">
                Same as shipping address
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">The total amount of</h2>
          {/* Responsive card with better padding */}
          <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 mb-4">
            <p className="text-gray-600 text-sm sm:text-base">
              Total amount: ${totalAmount.toFixed(2)}
            </p>
            {promoCode.code && (
              <p className="text-green-600 text-sm sm:text-base">
                Promo code applied: {promoCode.code} ({promoCode.discount}% off)
              </p>
            )}
            <p className="text-gray-800 font-bold text-lg sm:text-xl mt-2">
              The total amount of (including VAT): ${discountedAmount.toFixed(2)}
            </p>
            {/* Responsive button */}
            <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
              PROCEED TO SHIPPING
            </button>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Apply promo code</h2>
          {/* Responsive promo code section */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCodeInput}
              onChange={handlePromoCodeChange}
              className="p-2 border rounded w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={handleApplyPromoCode}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                APPLY
              </button>
              {promoCode.code && (
                <button
                  onClick={handleClearPromoCode}
                  className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;