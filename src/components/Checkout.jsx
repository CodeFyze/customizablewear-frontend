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
    <div className="checkout-container mx-4 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping address</h2>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Last name"
                className="p-2 border rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Company name"
              className="p-2 border rounded w-full mb-4"
            />
            <input
              type="text"
              placeholder="Address"
              className="p-2 border rounded w-full mb-4"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded w-full mb-4"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="p-2 border rounded w-full mb-4"
            />
            <textarea
              placeholder="Additional information"
              className="p-2 border rounded w-full mb-4"
            ></textarea>
            <div className="mb-4">
              <input type="checkbox" id="sameAsShipping" />
              <label htmlFor="sameAsShipping" className="ml-2">
                Same as shipping address
              </label>
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">The total amount of</h2>
          <div className="bg-white shadow-lg rounded-md p-4 mb-4">
            <p className="text-gray-600 text-sm">
              Total amount: ${totalAmount.toFixed(2)}
            </p>
            {promoCode.code && (
              <p className="text-green-600 text-sm">
                Promo code applied: {promoCode.code} ({promoCode.discount}% off)
              </p>
            )}
            <p className="text-gray-800 font-bold text-lg mt-2">
              The total amount of (including VAT): ${discountedAmount.toFixed(2)}
            </p>
            <button className="mt-4 w-1/3 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300">
              PROCEED TO SHIPPING
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Apply promo code</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCodeInput}
              onChange={handlePromoCodeChange}
              className="p-2 border rounded w-full"
            />
            <button
              onClick={handleApplyPromoCode}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              APPLY
            </button>
            {promoCode.code && (
              <button
                onClick={handleClearPromoCode}
                className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
