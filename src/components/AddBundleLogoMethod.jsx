import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import AddTextLogoPopup from './AddTextLogoPopup';
import UploadLogoPopup from './UploadLogoPopup';

const AddLogoPopup = ({
  onClose,
  onBack,
  onComplete,
  selectedPositions = {
    'Polo Shirts': [],
    'Sweatshirts': []
  }
}) => {
  const [logoType, setLogoType] = useState(null);
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const positionsArray = Object.values(selectedPositions).flat().filter(Boolean);
  const positionsText = positionsArray.length > 0 ? positionsArray.join(', ') : 'None selected';

  const handleTextLogoSelect = () => {
    setLogoType('text');
  };

  const handleUploadLogoSelect = () => {
    setLogoType('upload');
  };

  const isSubmitEnabled = () => logoType === 'text' || logoType === 'upload';

  const handleSubmit = () => {
    if (logoType === 'text') {
      setShowTextPopup(true);
    } else if (logoType === 'upload') {
      setShowUploadPopup(true);
    }
  };

  const handleFinishTextLogo = (textLogoData) => {
    const logoData = {
      type: 'text',
      content: textLogoData,
      positions: selectedPositions
    };
    onComplete(logoData);
  };

  const handleFinishUploadLogo = (uploadLogoData) => {
    const logoData = {
      type: 'upload',
      content: uploadLogoData,
      positions: selectedPositions
    };
    onComplete(logoData);
  };

  const handleBackFromTextPopup = () => {
    setShowTextPopup(false);
  };

  const handleBackFromUploadPopup = () => {
    setShowUploadPopup(false);
  };

  if (showTextPopup) {
    return (
      <AddTextLogoPopup
        onBack={handleBackFromTextPopup}
        onClose={onClose}
        onFinish={handleFinishTextLogo}
      />
    );
  }

  if (showUploadPopup) {
    return (
      <UploadLogoPopup
        onBack={handleBackFromUploadPopup}
        onClose={onClose}
        onFinish={handleFinishUploadLogo}
        selectedPositions={selectedPositions}
      />
    );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative'>
        <button
          className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'
          onClick={onClose}
          aria-label='Close'
        >
          <FaTimes size={20} />
        </button>

        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Add Your Logo</h2>
          <p className='text-gray-600 mb-2'>Selected Positions: {positionsText}</p>
          <p className='text-gray-600 mb-6'>Choose a method of adding your logo</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          {/* Text Logo */}
          <div
            className={`text-center p-4 border rounded-lg transition-shadow ${
              logoType === 'text'
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-300 hover:shadow-md cursor-pointer'
            }`}
            onClick={handleTextLogoSelect}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleTextLogoSelect()}
          >
            <div className='bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3'>
              <span className='text-4xl font-bold'>T</span>
            </div>
            <h3 className='font-semibold mb-2'>Text Logo</h3>
            <p className='text-sm text-gray-500'>
              Add a basic font to your garments. For example, a company, club, or employee name.
            </p>
          </div>

          {/* Upload Logo */}
          <div
            className={`text-center p-4 border rounded-lg transition-shadow ${
              logoType === 'upload'
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-300 hover:shadow-md cursor-pointer'
            }`}
            onClick={handleUploadLogoSelect}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleUploadLogoSelect()}
          >
            <div className='bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0-6l-3 3m3-3l3 3m3-10a4 4 0 00-8 0v4h8V9z'
                />
              </svg>
            </div>
            <h3 className='font-semibold mb-2'>Upload Logo</h3>
            <p className='text-sm text-gray-500'>
              Upload your own logo for use on your selected garments.
            </p>
          </div>
        </div>

        <div className='flex justify-between mt-4'>
          <button
            onClick={onBack}
            className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isSubmitEnabled()}
            className={`px-4 py-2 rounded ${
              isSubmitEnabled()
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

AddLogoPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  selectedPositions: PropTypes.object
};

export default AddLogoPopup;
