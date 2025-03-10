import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();

      console.log("Product Details:", data);

      if (!data || !data.product) {
        console.error("Invalid product data");
        return;
      }

      setProduct(data.product);
      setSelectedImage(data.product.frontImage || "https://via.placeholder.com/400"); // Default Image
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <p className="text-center text-gray-600">Loading product details...</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <button className="mb-4 text-blue-500 hover:underline" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>
      <h2 className="text-3xl font-bold text-center mb-6">{product.title}</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Large Product Image */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full max-w-lg h-auto object-contain rounded-lg shadow-md"
          />
          <div className="flex space-x-3 mt-4">
            {/* Show multiple images */}
            {product.images && product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Product View ${index}`} 
                className="w-16 h-16 object-contain rounded-md shadow-md cursor-pointer" 
                onClick={() => setSelectedImage(img)} // Change image on click
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4">
          <p className="text-lg text-gray-700">{product.description}</p>

          {/* Price */}
          <p className="text-2xl font-bold text-green-600">${product.price}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="font-semibold">Available Colors:</p>
              <div className="flex space-x-2">
                {product.colorImages && product.colorImages.map((color, index) => (
                  <img 
                    key={index} 
                    src={color} 
                    alt={`Color ${index}`} 
                    className="w-10 h-10 rounded-full shadow-md border cursor-pointer" 
                    onClick={() => setSelectedImage(color)} // Change image when color is clicked
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.size && product.size.length > 0 && (
            <div>
              <p className="font-semibold">Available Sizes:</p>
              <div className="flex space-x-2">
                {product.size.map((s, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Buy Now Button */}
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
