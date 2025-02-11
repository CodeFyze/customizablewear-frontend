import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';
import Popup from './shirtpopup';

const SizeSelection = ({ selectedProduct }) => {
  const [sizes, setSizes] = useState([
    { size: 'S', price: 6.42, originalPrice: 8.50, stock: 63, quantity: 0 },
    { size: 'M', price: 6.42, originalPrice: 8.50, stock: 86, quantity: 0 },
    { size: 'L', price: 6.42, originalPrice: 8.50, stock: 185, quantity: 0 },
    { size: 'XL', price: 6.42, originalPrice: 8.50, stock: 123, quantity: 0 },
    { size: '2XL', price: 6.42, originalPrice: 8.50, stock: 69, quantity: 0 },
  ]);

  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const dispatch = useDispatch();

  const handleQuantityChange = (size, action) => {
    setSizes((prevSizes) =>
      prevSizes.map((s) =>
        s.size === size
          ? {
              ...s,
              quantity: action === 'increase' ? s.quantity + 1 : s.quantity - 1 < 0 ? 0 : s.quantity - 1,
            }
          : s
      )
    );
  };

  const handleAddToCart = () => {
    if (!selectedProduct) {
      alert('Please select a product first');
      return;
    }

    const selectedSize = sizes.find(size => size.quantity > 0);
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const productToAdd = {
      ...selectedProduct,
      size: selectedSize.size,
      quantity: selectedSize.quantity,
      price: selectedProduct.price, // Use the product's price
    };

    dispatch(add(productToAdd));
    alert('Item added to cart!');
  };

  // Handle opening and closing the popup
  const togglePopup = () => {
    const selectedSize = sizes.some((size) => size.quantity > 0);
    if (!selectedSize) {
      alert('Please select a size');
    } else {
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
              <span className="line-through text-red-600 mr-4">£{size.originalPrice}</span>
              <span className="text-lg font-semibold text-gray-700">£{size.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">{size.stock} in stock</span>
              <button
                onClick={() => handleQuantityChange(size.size, 'decrease')}
                className="text-lg bg-gray-200 px-2 py-1 rounded-md mr-2"
              >
                -
              </button>
              <span className="text-lg">{size.quantity}</span>
              <button
                onClick={() => handleQuantityChange(size.size, 'increase')}
                className="text-lg bg-gray-200 px-2 py-1 rounded-md ml-2"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={togglePopup} // Show the popup when clicked
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          ADD LOGO
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
        >
          ADD TO CART
        </button>
      </div>

      <Popup visible={popupVisible} onClose={togglePopup} /> {/* Pass visibility and onClose handler */}
    </div>
  );
};

export default SizeSelection;