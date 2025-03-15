import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { IoClose } from 'react-icons/io5';
import { handleImageUpload, addColor, handleColorChange, handleSizeChange, removeColor, handleCategoryChange, handleFormSubmit } from "../utils/bundleHandlers"

const Popup = ({ closePopup }) => {
  const [products, setProducts] = useState([
    { image: null, colors: [] }, // Product 1
    { image: null, colors: [] }  // Product 2
  ]);
  const [selectedCategories, setSelectedCategories] = useState({
    solo1: false,
    solo2: false,
    everyday: false
  });

  return (
    <div>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <div className="p-6 bg-white rounded-md shadow-lg max-w-lg mx-auto relative z-50">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
        >
          <IoClose size={24} />
        </button>

        {/* Product List */}
        {products.map((product, productIndex) => (
          <div key={productIndex} className="border p-4 mb-4 rounded-md shadow-md">
            <h4 className="font-semibold text-lg mb-2">Product {productIndex + 1}</h4>

            {/* Image Upload */}
            <ImageUpload onUpload={(file) => handleImageUpload(file, productIndex, products, setProducts)} />

            {/* Add Color Button */}
            <button
              onClick={() => addColor(productIndex, products, setProducts)}
              className="w-full py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 mt-3"
            >
              Add Color
            </button>

            {/* Color Inputs */}
            {product.colors.map((color, colorIndex) => (
              <div key={colorIndex} className="mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color.color}
                    onChange={(e) => handleColorChange(productIndex, colorIndex, e.target.value, products, setProducts)}
                    className="border border-gray-300 rounded-md w-20 h-10"
                  />
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: color.color,
                      borderRadius: '5px',
                    }}
                  />
                </div>

                {/* Color image upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleColorImageChange(e, productIndex, colorIndex)}
                  className="border border-gray-300 p-2 rounded-md w-full mt-2"
                />

                {/* Remove color */}
                <button
                  onClick={() => removeColor(productIndex, colorIndex, products, setProducts)}
                  className="mt-2 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove Color
                </button>

                {/* Size Selection */}
                <label className="block text-gray-700 mt-2">Select Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                    <label key={size}>
                      <input
                        type="checkbox"
                        value={size}
                        checked={color.sizes.includes(size)}
                        onChange={() => handleSizeChange(productIndex, colorIndex, size, products, setProducts)}
                        className="mr-2"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
            ))}

          </div>
        ))}


<h3 className="text-xl font-semibold mb-4">Product Configuration</h3>

{/* Category Selection */}
<div className="mb-6">
  <label className="block text-lg font-semibold text-gray-800">Select Product Categories:</label>
  <div className="flex flex-col gap-4 mt-2">
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={selectedCategories.solo1}
        onChange={() => handleCategoryChange('solo1', selectedCategories, setSelectedCategories)}
        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-400"
      />
      <span className="text-gray-700 text-base">Solo Starter Bundle 1</span>
    </label>
    
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={selectedCategories.solo2}
        onChange={() => handleCategoryChange('solo2', selectedCategories, setSelectedCategories)}
        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-400"
      />
      <span className="text-gray-700 text-base">Solo Starter Bundle 2</span>
    </label>
    
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={selectedCategories.everyday}
        onChange={() => handleCategoryChange('everyday', selectedCategories, setSelectedCategories)}
        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-400"
      />
      <span className="text-gray-700 text-base">Everyday Bundle</span>
    </label>
  </div>
</div>

        {/* Submit Button */}
        <button
          onClick={() => handleFormSubmit(products, selectedCategories)}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Popup;
