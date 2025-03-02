import React, { useState, useEffect } from "react";

const AddTextLogoPopup = ({ 
  onBack, 
  onFinish, 
  selectedProduct,
  selectedSize, 
  selectedColor, 
  selectedMethod, 
  selectedPosition 
}) => {
  const [textLine, setTextLine] = useState(selectedProduct?.textLine || "");
  const [font, setFont] = useState(selectedProduct?.font || "Standard");
  const [notes, setNotes] = useState(selectedProduct?.notes || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Product:", selectedProduct);
    console.log("Size:", selectedSize);
    console.log("Color:", selectedColor);
    console.log("Method:", selectedMethod);
    console.log("Position:", selectedPosition);
  }, [selectedProduct, selectedSize, selectedColor, selectedMethod, selectedPosition]);

  const handleFinish = async () => {
    // Validation
    if (!textLine.trim()) {
      alert("Please enter text for the logo.");
      return;
    }
    if (!selectedSize || !selectedSize.size) {
      alert("Please select a size before finishing.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before finishing.");
      return;
    }
    if (!selectedMethod || selectedMethod.trim() === "") {
      alert("Please select a printing method before finishing.");
      return;
    }
    if (!selectedPosition || selectedPosition.trim() === "") {
      alert("Please select a logo position before finishing.");
      return;
    }

    const quantity =
      selectedSize?.quantity &&
      Number.isInteger(Number(selectedSize.quantity)) &&
      selectedSize.quantity > 0
        ? selectedSize.quantity
        : 1;

    const requestData = {
      productId: selectedProduct?._id,
      title: selectedProduct?.title,
      frontImage: selectedProduct?.frontImage || selectedProduct?.image,
      size: selectedSize.size,
      color: selectedColor,
      quantity,
      method: selectedMethod,
      position: selectedPosition,
      textLine,
      font,
      notes,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item successfully added to cart!");
        onFinish();
      } else {
        alert(data.message || "Failed to add item to cart.");
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error.message);
      alert("An error occurred while adding to the cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Add Your Text Logo</h2>
          <p className="text-gray-600 mb-4">
            Create your text logo, we have no setup fees! We will always send a
            design proof for your approval before production.
          </p>
          {selectedProduct?.frontImage && (
            <img src={selectedProduct.frontImage} alt={selectedProduct.title} className="w-32 h-auto mx-auto mt-2 border rounded-md" />
          )}
        </div>
        <div className="space-y-4">
          {/* Text Line Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Line
            </label>
            <input
              type="text"
              value={textLine}
              onChange={(e) => setTextLine(e.target.value)}
              placeholder="Enter your text"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Font Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font
            </label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option>Standard</option>
              <option>Serif</option>
              <option>Sans-serif</option>
            </select>
          </div>

          {/* Text Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Text Preview</h3>
            <div className="bg-black text-center py-3 rounded-md">
              <span
                className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md"
              >
                {textLine || "Preview Text"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Please note: The black box is for preview purposes only.
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Leave a message"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
          >
            Back
          </button>
          <button
            onClick={handleFinish}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Adding..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTextLogoPopup;
