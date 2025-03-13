// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addItem } from "../store/cartSlice"; // Correct action import
// import Popup from "./shirtpopup";

// const SizeSelection = ({ selectedProduct, onSizeSelect }) => {
//   const [sizes, setSizes] = useState([
//     { size: "S", price: 6.42, originalPrice: 8.5, stock: 63, quantity: 0 },
//     { size: "M", price: 6.42, originalPrice: 8.5, stock: 86, quantity: 0 },
//     { size: "L", price: 6.42, originalPrice: 8.5, stock: 185, quantity: 0 },
//     { size: "XL", price: 6.42, originalPrice: 8.5, stock: 123, quantity: 0 },
//     { size: "2XL", price: 6.42, originalPrice: 8.5, stock: 69, quantity: 0 },
//     { size: "3XL", price: 6.42, originalPrice: 8.5, stock: 69, quantity: 0 },
//     { size: "4XL", price: 6.42, originalPrice: 8.5, stock: 69, quantity: 0 },
//   ]);

//   const [popupVisible, setPopupVisible] = useState(false);
//   const dispatch = useDispatch();

//   const handleQuantityChange = (size, action) => {
//     setSizes((prevSizes) => {
//       const updatedSizes = prevSizes.map((s) =>
//         s.size === size
//           ? {
//               ...s,
//               quantity:
//                 action === "increase"
//                   ? s.quantity + 1
//                   : Math.max(0, s.quantity - 1),
//             }
//           : s
//       );

//       const selected = updatedSizes.find(
//         (s) => s.size === size && s.quantity > 0
//       );

//       if (selected) {
//         onSizeSelect(selected);
//       } else {
//         onSizeSelect(null);
//       }

//       return updatedSizes;
//     });
//   };

//   const togglePopup = () => {
//     const selectedSize = sizes.find((size) => size.quantity > 0);
//     if (!selectedSize) {
//       alert("Please select a size");
//     } else {
//       dispatch(addItem(selectedSize)); // Correct action used
//       setPopupVisible(!popupVisible);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 md:mb-5">
//       <div className="text-xl font-semibold mb-4">Select Size</div>
//       <div className="space-y-4">
//         {sizes.map((size) => (
//           <div key={size.size} className="flex justify-between items-center">
//             <div className="flex items-center">
//               <span className="text-lg font-medium mr-4">{size.size}</span>
//               <span className="line-through text-red-600 mr-4">
//                 £{size.originalPrice}
//               </span>
//               <span className="text-lg font-semibold text-gray-700">
//                 £{size.price.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-gray-500 mr-4">{size.stock} in stock</span>
//               <button
//                 onClick={() => handleQuantityChange(size.size, "decrease")}
//                 className="text-lg bg-gray-200 px-2 py-1 rounded-md mr-2"
//               >
//                 -
//               </button>
//               <span className="text-lg">{size.quantity}</span>
//               <button
//                 onClick={() => handleQuantityChange(size.size, "increase")}
//                 className="text-lg bg-gray-200 px-2 py-1 rounded-md ml-2"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Popup visible={popupVisible} onClose={togglePopup} />
//     </div>
//   );
// };

// export default SizeSelection;
 

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice"; // Correct action import
import Popup from "./shirtpopup";

const SizeSelection = ({ selectedProduct, onSizeSelect }) => {
  const [sizes, setSizes] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const dispatch = useDispatch();

  // Fetch the sizes data when the component is mounted
  useEffect(() => {
    if (selectedProduct) {
      const fetchProductSizes = async () => {
        try {
          // Fetch the product data from the backend (replace with the correct API URL)
          const response = await fetch(`http://localhost:5000/api/products/${selectedProduct._id}`);
          const data = await response.json();

          if (data.success && data.product) {
            // Set the sizes based on the data fetched from the backend
            setSizes(
              data.product.size.map((size) => ({
                size,
                price: 6.42, // You can modify this to match your backend data
                originalPrice: 8.5, // Modify as per your backend data
                stock: 100, // Modify as per your backend data
                quantity: 0,
              }))
            );
          } else {
            console.error("Failed to fetch product data:", data.message);
          }
        } catch (error) {
          console.error("Error fetching product sizes:", error);
        }
      };

      fetchProductSizes();
    }
  }, [selectedProduct]); // Run the effect when selectedProduct changes

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
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium mr-4">{size.size}</span>
              <span className="line-through text-red-600 mr-4">
                £{size.originalPrice}
              </span>
              <span className="text-lg font-semibold text-gray-700">
                £{size.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-center">
              {/* <span className="text-gray-500 mr-4">{size.stock} in stock</span> */}
              <button
                onClick={() => handleQuantityChange(size.size, "decrease")}
                className="text-lg bg-gray-200 px-3 py-1 rounded-md mr-2 ml-2"
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
