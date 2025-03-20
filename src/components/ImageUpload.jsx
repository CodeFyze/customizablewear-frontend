import React, { useState } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  return (
    <div className="mb-4">
    <h1 className='text-xl'> first Product image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleColorImageChange(e, productIndex, colorIndex, products, setProducts)}
        className="border border-gray-300 p-2 rounded-md w-full"
      />
      {file && <p className="mt-2 text-gray-600">{file.name}</p>}
      {!file && <p className="mt-2 text-gray-500">Drag & Drop your product image here or click to select</p>}
    </div>
  );
};

export default ImageUpload;
