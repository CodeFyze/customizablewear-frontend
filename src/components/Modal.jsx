import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";

const apiUrl = import.meta.env.VITE_API_BASE_URL; 
const Modal = ({ isOpen, onClose, initialData }) => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("In Stock");
  const [productDescription, setProductDescription] = useState(""); // Added state for description
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [colors, setColors] = useState([]); // Colors without null values
  const [colorImages, setColorImages] = useState({}); // Store color images
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeImages, setSizeImages] = useState({});
    // Added state for selected product type
    const [productType, setProductType] = useState({
      hoodie: false,
      shirt: false,
      trouser: false,
    });
  

  useEffect(() => {
    if (initialData) {
      setProductTitle(initialData.title || "");
      setProductPrice(initialData.price || "");
      setProductStock(initialData.stock || "In Stock");
      setProductDescription(initialData.description || ""); // Set the description field if initial data is provided
      setFrontImage(initialData.images?.front || null);
      setBackImage(initialData.images?.back || null);
      setSideImage(initialData.images?.side || null);
      setColors(initialData.colors.filter(color => color !== null) || []); // Filter out null colors
      setImages(initialData.images?.extra || []);
      setSizes(initialData.sizes || []); // Only set sizes if initialData is present
      setColorImages({});
      setSizeImages({});
    } else {
      setProductTitle("");
      setProductPrice("");
      setProductStock("In Stock");
      setProductDescription(""); // Reset description
      setColors([]); // Initialize as empty array
      setImages([]);
      setSizes([]); // Reset sizes to an empty array
      setColorImages({});
      setSizeImages({});
    }
  }, [initialData]);

  if (!isOpen) return null;

    // Handle product type checkbox change
    const handleProductTypeChange = (e) => {
      const { name, checked } = e.target;
      setProductType((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "front") setFrontImage(file);
    if (type === "back") setBackImage(file);
    if (type === "side") setSideImage(file);
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      toast.error("You can upload up to 10 additional images only.", { position: "top-right" });
      return;
    }
    setImages([...images, ...files]);
  };

  const removeExtraImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addColor = () => {
    setColors([...colors, "#000000"]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
    const newColorImages = { ...colorImages };
    delete newColorImages[index];  // Remove color image if color is deleted
    setColorImages(newColorImages);
  };

  const updateColor = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleColorImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setColorImages((prev) => ({ ...prev, [index]: file })); // Store color image
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    if (value === "") return;
    setSizes([...sizes, value]);
  };

  const removeSize = (size) => {
    setSizes(sizes.filter((s) => s !== size));
    const newSizeImages = { ...sizeImages };
    delete newSizeImages[size];
    setSizeImages(newSizeImages);
  };

  const handleSizeImageChange = (e, size) => {
    const file = e.target.files[0];
    if (!file) return;
    setSizeImages((prev) => ({ ...prev, [size]: file }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  

  
    if (!frontImage || !backImage || !sideImage) {
      toast.error("Please upload all three main images (front, back, side)!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    formData.append("description", productDescription); // Append description
    formData.append("front", frontImage);
    formData.append("back", backImage);
    formData.append("side", sideImage);
  
    // Append additional images
    images.forEach((img) => formData.append("images", img));
  
    // Send colors as JSON string, filtering out any null values
    formData.append("colors", JSON.stringify(colors.filter(color => color !== null)));
  
    // Append color images, filtering out null images
    Object.entries(colorImages).forEach(([index, img]) => {
      if (img !== null) {
        formData.append("colorImages", img);
      }
    });
  
    // Append sizes data
    formData.append("sizes", JSON.stringify(sizes));
    Object.entries(sizeImages).forEach(([size, img]) => {
      formData.append("sizeImages", img);
    });
  
    // Construct productType array (only include the checked options)
    const selectedProductTypes = Object.keys(productType).filter(key => productType[key]);
    formData.append("productType", JSON.stringify(selectedProductTypes));
  
    try {
      const response = await fetch(`${apiUrl}/products/add`, {
				method: 'POST',
				body: formData,
			
				credentials: 'include',
			});
  
      const data = await response.json();
      if (!data.success) {
        toast.error(`Error: ${data.message}`);
      } else {
        toast.success("Product added successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-scroll">
        <button onClick={onClose} className="float-end bg-orange-400 text-white px-1 py-1 rounded">
          <RxCross1 size={20} />
        </button>
        <h2 className="text-xl font-semibold mt-2 mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
            placeholder="Product Name"
          />
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            placeholder="Price"
          />
          <textarea
            className="w-full p-2 border rounded"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            rows="4"
          />

          {["front", "back", "side"].map((type) => (
            <input
              className="w-full p-2 border rounded"
              key={type}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, type)}
            />
          ))}

          <input className="w-full p-2 border rounded" type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />

          <div className="space-y-2">
            <label className="block">Add Sizes</label>
            <select className="w-full p-2 border rounded" onChange={handleSizeChange}>
              <option value="">Select Size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
              <option value="2XL">Double extra Large</option>
            </select>
            {sizes.map((size, index) => (
              <div key={index} className="flex items-center justify-between gap-2 mt-2">
                <span className="w-10 p-2 pl-2 bg-orange-400">{size}</span>
                <button onClick={() => removeSize(size)} className="bg-orange-400 text-white px-1 py-1 rounded">
                  <RxCross1 size={20} />
                </button>
              </div>
            ))}
          </div>



          <div>
            <label className="block">Select Product Type:</label>
            <label>
              <input
                type="checkbox"
                name="hoodie"
                checked={productType.hoodie}
                onChange={handleProductTypeChange}
              /> Hoodie
            </label>
            <label>
              <input
                type="checkbox"
                name="shirt"
                checked={productType.shirt}
                onChange={handleProductTypeChange}
              /> Shirt
            </label>
            <label>
              <input
                type="checkbox"
                name="trouser"
                checked={productType.trouser}
                onChange={handleProductTypeChange}
              /> Trouser
            </label>
            <label>
              <input
                type="checkbox"
                name="polo"
                checked={productType.polo}
                onChange={handleProductTypeChange}
              /> polo
            </label>
            <label>
              <input
                type="checkbox"
                name="pant"
                checked={productType.pant}
                onChange={handleProductTypeChange}
              /> pant
            </label>
            <label>
              <input
                type="checkbox"
                name="sweatShirt"
                checked={productType.sweatShirt}
                onChange={handleProductTypeChange}
              /> sweatShirt
            </label>
          </div>
          <button className="px-4 py-2 bg-orange-400 text-white rounded" type="button" onClick={addColor}>
            Add Color
          </button>

          {colors.map((color, index) => (
            <div key={index} className="flex flex-col gap-2 mt-2">
              <input type="color" value={color} onChange={(e) => updateColor(index, e.target.value)} />
              <input type="file" accept="image/*" onChange={(e) => handleColorImageChange(e, index)} />
              <button className="px-2 py-1 bg-red-500 text-white rounded" type="button" onClick={() => removeColor(index)}>
                Remove
              </button>
            </div>
          ))}

          <button className="w-full p-2 bg-orange-400 text-white rounded" type="submit">
            Add Product
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
