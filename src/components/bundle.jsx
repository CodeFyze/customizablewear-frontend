import React, { useState } from 'react';
// import Popup from './Popup';
import Popup from './bundlePopUp';

const Bundle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bundleType, setBundleType] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = (type) => {
    setBundleType(type);
    setIsPopupOpen(true);
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className="p-6">
      <div className="relative inline-block text-left">
        {/* Main button that triggers the dropdown */}
        <button
          onClick={toggleDropdown}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Select Bundle
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => handleButtonClick('solo1')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Solo Bundle 1
              </button>
              <button
                onClick={() => handleButtonClick('solo2')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Solo Bundle 2
              </button>
              <button
                onClick={() => handleButtonClick('everyday')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Everyday Bundle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup will appear if dropdown option is selected */}
      {isPopupOpen && (
        <Popup
          type={bundleType}
          closePopup={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default Bundle;
