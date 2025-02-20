import React, { useEffect, useState } from "react";
import SizeSelection from "./SizeSelection";

const TShirtSelector = () => {
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShirtChange = (shirt) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedShirt(shirt);
      setIsAnimating(false);
    }, 300);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedShirt(product.frontImage);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/", {
          credentials: "include",
          method: "GET",
        });
        const data = await response.json();

        if (data.products && data.products.length > 0) {
          setProducts(data.products);
          setSelectedProduct(data.products[0]);
          setSelectedShirt(data.products[0]?.frontImage);
        }

        console.log("Fetched Products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-x-8 md:space-y-0">
      {/* Main Shirt Display */}
      <div className="w-full lg:w-[1000px] flex justify-center">
        {selectedShirt && (
          <img
            src={selectedShirt}
            alt="Selected T-Shirt"
            className={`w-full h-auto md:m-10 max-w-xs md:max-w-2xl p-4 md:p-0 transform transition-transform duration-200 ${
              isAnimating ? "scale-75 opacity-50" : "scale-100 opacity-100"
            }`}
          />
        )}
      </div>

      {/* Right-Side Section */}
      <div className="w-full lg:w-1/3 lg:pr-10">
        {/* Shirt Image Scroller (All Products' Front Images) */}
        <div className="mt-4 font-medium text-lg text-center md:text-left">
          Shirts
        </div>
        <div className="overflow-x-auto flex space-x-2 mt-4 p-2">
          {products.map((product, index) => (
            <div key={index} className="text-center">
              <img
                src={product.frontImage}
                alt={`Front View ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-orange-500 ${
                  selectedProduct === product ? "border-orange-500" : ""
                }`}
                onClick={() => handleProductSelect(product)}
              />
            </div>
          ))}
        </div>

        {/* Shirt Selector (Front, Side, and Back Images of Selected Product) */}
        <div className="mt-4 font-medium text-lg text-center md:text-left">
          Select Your T-Shirt View
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 p-2">
          {selectedProduct &&
            [
              selectedProduct.frontImage,
              selectedProduct.sideImage,
              selectedProduct.backImage,
            ].map((image, index) => (
              <div
                key={index}
                onClick={() => handleShirtChange(image)}
                className={`cursor-pointer w-full h-32 p-2 text-center transform transition-transform duration-300 ${
                  selectedShirt === image
                    ? "scale-105 outline outline-2 outline-orange-500"
                    : ""
                }`}
              >
                <img
                  src={image}
                  alt={`T-Shirt View ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
            ))}
        </div>

        {/* Color Picker */}
        <div className="mt-6 font-medium text-lg text-center md:text-left">
          Select Color
        </div>
        <div className="flex space-x-2 mt-4">
          {selectedProduct?.colors?.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:border-orange-500"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>

        <div className="mt-6 p-4 md:mb-3">
          <h3 className="text-lg font-bold mb-2">Shirt Details</h3>
          <p className="text-sm text-gray-700">
            {selectedProduct?.description || "No description available."}
          </p>
          <p className="text-sm font-bold mt-2">
            Price: Rs. {selectedProduct?.price}
          </p>
        </div>

        {/* Size Selection Section */}
        <SizeSelection selectedProduct={selectedProduct} />
      </div>
    </div>
  );
};

export default TShirtSelector;