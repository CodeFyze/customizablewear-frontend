import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice"; // Correct action import
import Popup from "./shirtpopup";

const SizeSelection = ({ selectedProduct, onSizeSelect }) => {
  const [sizes, setSizes] = useState([
    { size: "S", price: 6.42, originalPrice: 8.5, stock: 63, quantity: 0 },
    { size: "M", price: 6.42, originalPrice: 8.5, stock: 86, quantity: 0 },
    { size: "L", price: 6.42, originalPrice: 8.5, stock: 185, quantity: 0 },
    { size: "XL", price: 6.42, originalPrice: 8.5, stock: 123, quantity: 0 },
    { size: "2XL", price: 6.42, originalPrice: 8.5, stock: 69, quantity: 0 },
  ]);

  const [popupVisible, setPopupVisible] = useState(false);
  const dispatch = useDispatch();

  const handleQuantityChange = (size, action) => {
    setSizes((prevSizes) => {
      const updatedSizes = prevSizes.map((s) =>
        s.size === size
          ? {
              ...s,
              quantity:
                action === "increase"
                  ? s.quantity + 1
                  : Math.max(0, s.quantity - 1),
            }
          : s
      );

      const selected = updatedSizes.find(
        (s) => s.size === size && s.quantity > 0
      );

      if (selected) {
        onSizeSelect(selected);
      } else {
        onSizeSelect(null);
      }

      return updatedSizes;
    });
  };

  const togglePopup = () => {
    const selectedSize = sizes.find((size) => size.quantity > 0);
    if (!selectedSize) {
      alert("Please select a size");
    } else {
      dispatch(addItem(selectedSize)); // Correct action used
      setPopupVisible(!popupVisible);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:mb-5">
      <div className="text-xl font-semibold mb-4">Select Size</div>
      <div className="space-y-4">
        {sizes.map((size) => (
          <div key={size.size} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-medium mr-4">{size.size}</span>
              <span className="line-through text-red-600 mr-4">
                £{size.originalPrice}
              </span>
              <span className="text-lg font-semibold text-gray-700">
                £{size.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">{size.stock} in stock</span>
              <button
                onClick={() => handleQuantityChange(size.size, "decrease")}
                className="text-lg bg-gray-200 px-2 py-1 rounded-md mr-2"
              >
                -
              </button>
              <span className="text-lg">{size.quantity}</span>
              <button
                onClick={() => handleQuantityChange(size.size, "increase")}
                className="text-lg bg-gray-200 px-2 py-1 rounded-md ml-2"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <Popup visible={popupVisible} onClose={togglePopup} />
    </div>
  );
};

export default SizeSelection;
 