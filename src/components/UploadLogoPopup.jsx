import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice"; // Import the add action from cartSlice

const UploadLogoPopup = ({ onBack, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleFinish = () => {
    const product = {
      id: new Date().getTime(), // Unique ID based on timestamp
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      title: "Custom Logo",
      brand: "Your Brand",
      model: selectedFile ? selectedFile.name : "No file selected",
      price: 50, // Example price for a custom logo
      notes: note,
    };

    dispatch(add(product));
    onClose(); // Close the popup after adding to cart
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Upload Your Logo</h2>
          <p className="text-gray-600 mb-4">
            Upload with confidence, we have no setup fees!
          </p>
        </div>
        <div className="space-y-4">
          {/* File Upload Section */}
          <div className="text-center">
            {!selectedFile ? (
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 00-1 1v7H6a1 1 0 00-.707 1.707l4 4a1 1 0 001.414 0l4-4A1 1 0 0014 11h-3V4a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Choose File
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".jpg,.png,.eps,.ai,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">
                  Selected File: <strong>{selectedFile.name}</strong>
                </p>
                <button
                  onClick={handleRemoveFile}
                  className="mt-2 text-red-500 underline text-sm hover:text-red-700"
                >
                  Remove File
                </button>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Upload supported formats: <strong>JPG, PNG, EPS, AI, PDF</strong>
            </p>
            <p className="text-sm text-gray-500 mt-1">Max size: 8MB</p>
            <p className="text-sm text-gray-500 mt-1">
              Don’t worry how it looks, we will make it look great and send a
              proof before we add to your products!
            </p>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              placeholder="Leave a message"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
              Add Another Logo
            </button>
            <button
              onClick={handleFinish}
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLogoPopup;