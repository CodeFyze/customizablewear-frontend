




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();

      if (!data || !data.product) {
        console.error("Invalid product data");
        toast.error("Failed to load product details");
        return;
      }

      setProduct(data.product);
      setSelectedImage(data.product.frontImage || "https://via.placeholder.com/400");
      
      // Set default selections if available
      if (data.product.size && data.product.size.length > 0) {
        setSelectedSize(data.product.size[0]);
      }
      if (data.product.colors && data.product.colors.length > 0) {
        setSelectedColor(data.product.colors[0]);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to load product details");
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Validate selections
    if (product.size && product.size.length > 0 && !selectedSize) {
      toast.warning("Please select a size");
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.warning("Please select a color");
      return;
    }

    setIsAddingToCart(true);
    
    try {
      // Get token from storage (check both localStorage and cookies)
      const token = localStorage.getItem('authToken') || 
                    document.cookie.split('; ')
                      .find(row => row.startsWith('token='))
                      ?.split('=')[1];

      if (!token) {
        throw new Error("Please login to continue");
      }

      const response = await fetch(`${apiUrl}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product._id,
          image: selectedImage,
          title: product.title,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
          price: product.price,
        }),
      });

      // Handle unauthorized response
      if (response.status === 401) {
        // Clear invalid token and redirect to login
        localStorage.removeItem('authToken');
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        throw new Error("Session expired. Please login again.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      toast.success("Product added to cart successfully!");
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      
      if (error.message.includes("Unauthorized") || 
          error.message.includes("login") || 
          error.message.includes("Session expired")) {
        toast.error(error.message);
        navigate('/login', { 
          state: { from: window.location.pathname } 
        });
      } else {
        toast.error(error.message || "Failed to add to cart");
      }
    } finally {
      setIsAddingToCart(false);
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
              onClick={() => setSelectedImage(img)} 
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
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full shadow-md border cursor-pointer flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setSelectedColor(color);
                    // If color images are available, change the main image when color is selected
                    if (product.colorImages && product.colorImages[index]) {
                      setSelectedImage(product.colorImages[index]);
                    }
                  }}
                  title={color}
                >
                  {!color.startsWith('#') && color.length < 10 && color}
                </button>
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
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm ${selectedSize === s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
    
        <button 
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductDetailsPage;















