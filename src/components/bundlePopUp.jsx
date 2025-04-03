import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const ImageUpload = ({ onUpload, handleColorImageChange, productIndex, colorIndex }) => {
  return (
    <div className="mb-4">
      <h1 className="text-xl">Product Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onUpload(file);
        }}
        className="border border-gray-300 p-2 rounded-md w-full mt-2"
      />
    </div>
  );
};

const Popup = ({ closePopup, onBundleCreated }) => {
  const [products, setProducts] = useState([
    { image: null, colors: [] }, // Product 1
    { image: null, colors: [] }, // Product 2
  ]);
  const [selectedCategories, setSelectedCategories] = useState({
    solo1: false,
    solo2: false,
    everyday: false,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('Premium custom bundle');

  // Handler functions
  const handleImageUpload = (fileData, productIndex) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].image = fileData;
    setProducts(updatedProducts);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(file);
  };

  const handleColorImageChange = (e, productIndex, colorIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedProducts = [...products];
    updatedProducts[productIndex].colors[colorIndex].image = file;
    setProducts(updatedProducts);
  };

  const addColor = (productIndex) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors.push({ color: '#000000', image: null, sizes: [] });
    setProducts(updatedProducts);
  };

  const handleColorChange = (productIndex, colorIndex, value) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors[colorIndex].color = value;
    setProducts(updatedProducts);
  };

  const handleSizeChange = (productIndex, colorIndex, size) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product, pIndex) => {
        if (pIndex !== productIndex) return product;

        return {
          ...product,
          colors: product.colors.map((color, cIndex) => {
            if (cIndex !== colorIndex) return color;

            const updatedSizes = color.sizes.includes(size)
              ? color.sizes.filter((s) => s !== size)
              : [...color.sizes, size];

            return { ...color, sizes: updatedSizes };
          }),
        };
      });

      return updatedProducts;
    });
  };

  const removeColor = (productIndex, colorIndex) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors.splice(colorIndex, 1);
    setProducts(updatedProducts);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleFormSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }
  
    // Validate required fields
    if (!title.trim()) {
      alert("Please enter a title for the bundle");
      return;
    }
  
    if (!price || isNaN(price)) {
      alert("Please enter a valid price for the bundle");
      return;
    }
  
    if (!thumbnail) {
      alert("Please upload a thumbnail image");
      return;
    }
  
    // Prepare FormData
    const formData = new FormData();
    
    // Append basic fields
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    
    // Append thumbnail file with explicit filename
    formData.append('thumbnail', thumbnail, 'thumbnail.jpg');
  
    // Append products data
    formData.append('BundleData', JSON.stringify(
      products.map((product, productIndex) => ({
        productIndex,
        colors: product.colors.map(color => ({
          color: color.color,
          sizes: color.sizes
        }))
      }))
    ));
  
    // Append categories
    formData.append('categories', JSON.stringify(
      Object.keys(selectedCategories).filter(cat => selectedCategories[cat])
    ));
  
    // Append all images with proper naming
    products.forEach((product, productIndex) => {
      if (product.image) {
        formData.append(
          `productImage_${productIndex}`, 
          product.image, 
          `product_${productIndex}.jpg`
        );
      }
      product.colors.forEach((color, colorIndex) => {
        if (color.image) {
          formData.append(
            `colorImage_${productIndex}_${colorIndex}`, 
            color.image,
            `color_${productIndex}_${colorIndex}.jpg`
          );
        }
      });
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/bundle/add', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create bundle');
      }
  
      const data = await response.json();
      console.log('Bundle created successfully:', data);
      
      // Call the callback with the created bundle data
      if (onBundleCreated) {
        onBundleCreated(data.bundle);
      }
      
      alert('Bundle created successfully!');
      closePopup();
    } catch (err) {
      console.error('Error:', err);
      alert(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-md shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
          >
            <IoClose size={24} />
          </button>

          <div className="p-6">
            {/* Basic Information */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Basic Information</h1>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Bundle Title*</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter bundle title"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Price*</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  rows={3}
                />
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold">Bundle Thumbnail*</h1>
              <p className="text-sm text-gray-500 mb-2">This will be the main image shown in listings</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            {/* Product List */}
            {products.map((product, productIndex) => (
              <div key={productIndex} className="border p-4 mb-4 rounded-md shadow-md">
                <h4 className="font-semibold text-lg mb-2">Product {productIndex + 1}</h4>

                {/* Image Upload */}
                <ImageUpload
                  onUpload={(file) => handleImageUpload(file, productIndex)}
                />

                {/* Add Color Button */}
                <button
                  onClick={() => addColor(productIndex)}
                  className="w-full py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 mt-3"
                >
                  Add Color
                </button>

                {/* Color Inputs */}
                {product.colors.map((color, colorIndex) => (
                  <div key={colorIndex} className="mb-4 mt-4 p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color.color}
                        onChange={(e) =>
                          handleColorChange(productIndex, colorIndex, e.target.value)
                        }
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
                    <div className="mt-3">
                      <label className="block text-gray-700">Color Image*</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleColorImageChange(e, productIndex, colorIndex)
                        }
                        className="border border-gray-300 p-2 rounded-md w-full mt-1"
                        required
                      />
                    </div>

                    {/* Remove color */}
                    <button
                      onClick={() => removeColor(productIndex, colorIndex)}
                      className="mt-3 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove Color
                    </button>

                    {/* Size Selection */}
                    <label className="block text-gray-700 mt-3">Select Sizes*</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Small', 'Medium', 'Large', 'Extra Large'].map((size, sizeIndex) => (
                        <label key={sizeIndex} className="flex items-center">
                          <input
                            type="checkbox"
                            value={size}
                            checked={color.sizes.includes(size)}
                            onChange={() =>
                              handleSizeChange(productIndex, colorIndex, size)
                            }
                            className="mr-2"
                            required={color.sizes.length === 0}
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800">Select Product Categories*</label>
              <div className="flex flex-col gap-4 mt-2">
                {['solo1', 'solo2', 'everyday'].map((category, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories[category]}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-400"
                      required={Object.values(selectedCategories).every(val => !val)}
                    />
                    <span className="text-gray-700 text-base">
                      {category === 'solo1'
                        ? 'Solo Starter Bundle 1'
                        : category === 'solo2'
                        ? 'Solo Starter Bundle 2'
                        : 'Everyday Bundle'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleFormSubmit}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-3 font-medium"
            >
              Submit Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;