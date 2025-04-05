import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import Embroidery from '../assets/images/Embroidery.jpeg';
import Print from '../assets/images/print.jpeg';
import PositionPopup from './bundlePositionSelector';
import AddLogoMethod from './AddBundleLogoMethod';
import AddTextLogoPopup from './AddTextLogoPopup';
import UploadLogoPopup from './UploadLogoPopup';

const BundleLogoPopup = ({ onClose, visible, selectedProduct, previousLogo }) => {
  const [currentStep, setCurrentStep] = useState('method');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedPositions, setSelectedPositions] = useState({
    'Polo Shirts': [],
    'Sweatshirts': []
  });
  const [logoType, setLogoType] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [usePreviousLogo, setUsePreviousLogo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMethodSelect = (method) => setSelectedMethod(method);

  const handleNextStep = () => {
    if (selectedMethod) setCurrentStep('position');
  };

  const handleBackFromPosition = () => setCurrentStep('method');

  const handleBackFromLogoMethod = () => setCurrentStep('position');

  const handleBackFromTextLogo = () => setCurrentStep('logoMethod');

  const handlePositionSelectionComplete = (positions) => {
    setSelectedPositions(positions);
    setCurrentStep('logoMethod');
  };

  const handleLogoMethodComplete = (data) => {
    setLogoType(data.type);
    if (data.type === 'text') {
      setCurrentStep('addTextLogo');
    } else if (data.type === 'upload') {
      setCurrentStep('uploadLogo');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setUsePreviousLogo(false);
    }
  };

  const handleUsePreviousLogo = () => {
    setUsePreviousLogo(true);
    setLogoFile(null);
    setPreviewURL('');
  };

  const handleRemoveFile = () => {
    setLogoFile(null);
    setPreviewURL('');
  };

  const handleFinish = () => {
    setLoading(true);
    const logoData = {
      type: 'upload',
      content: usePreviousLogo ? previousLogo : logoFile,
      positions: selectedPositions,
    };
    handleFinalSubmission(logoData);
  };

  const handleFinalSubmission = (finalLogoData) => {
    console.log('Final submission:', {
      method: selectedMethod,
      positions: selectedPositions,
      logo: finalLogoData
    });
    setLoading(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <>
      {currentStep === 'method' && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-white p-8 rounded-lg w-96 md:w-[600px] z-60 relative'>
            <button onClick={onClose} className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2' aria-label="Close">
              <FaTimes size={20} />
            </button>
            <div className='font-semibold text-xl mb-4 text-center'>T-Shirt Title</div>
            <div className='text-lg mb-4 text-center'>Select an application method</div>
            <div className='flex flex-col md:flex-row justify-between gap-4'>
              <div
                onClick={() => handleMethodSelect('embroidery')}
                className={`flex flex-col items-center cursor-pointer w-full p-4 rounded-md transition-all ${
                  selectedMethod === 'embroidery'
                    ? 'border-2 border-orange-500 bg-orange-50'
                    : 'border-2 border-gray-200 hover:border-orange-300'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleMethodSelect('embroidery')}
              >
                <div className='border-2 border-orange-500 rounded-md mb-3'>
                  <img src={Embroidery} alt='Embroidery' className='object-cover w-full h-40 rounded-md' loading="lazy" />
                </div>
                <div className='text-lg font-semibold text-center'>Embroidery</div>
                <div className='text-sm text-gray-500 text-center mt-2'>Embroidery involves stitching logos onto garments by needle and thread.</div>
                {selectedMethod === 'embroidery' && <div className='mt-2 text-sm text-orange-500 font-medium'>✓ Selected</div>}
              </div>
              <div
                onClick={() => handleMethodSelect('print')}
                className={`flex flex-col items-center cursor-pointer w-full p-4 rounded-md transition-all ${
                  selectedMethod === 'print'
                    ? 'border-2 border-orange-500 bg-orange-50'
                    : 'border-2 border-gray-200 hover:border-orange-300'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleMethodSelect('print')}
              >
                <div className='border-2 border-gray-200 rounded-md mb-3'>
                  <img src={Print} alt='Print' className='object-cover w-full h-40 rounded-md' loading="lazy" />
                </div>
                <div className='text-lg font-semibold text-center'>Print</div>
                <div className='text-sm text-gray-500 text-center mt-2'>Printing involves pressing logos onto garments using heat.</div>
                {selectedMethod === 'print' && <div className='mt-2 text-sm text-orange-500 font-medium'>✓ Selected</div>}
              </div>
            </div>
            <div className='flex justify-end mt-6'>
              <button
                onClick={handleNextStep}
                className={`py-2 px-6 rounded-lg transition-colors ${
                  selectedMethod ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedMethod}
              >
                NEXT STEP
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'position' && (
        <PositionPopup
          onClose={onClose}
          onBack={handleBackFromPosition}
          onNext={handlePositionSelectionComplete}
          initialSelectedPositions={selectedPositions}
        />
      )}

      {currentStep === 'logoMethod' && (
        <AddLogoMethod
          onClose={onClose}
          onBack={handleBackFromLogoMethod}
          onComplete={handleLogoMethodComplete}
          selectedPositions={selectedPositions}
        />
      )}

      {currentStep === 'addTextLogo' && (
        <AddTextLogoPopup
          onBack={handleBackFromTextLogo}
          onClose={onClose}
          onFinish={handleFinalSubmission}
        />
      )}

      {currentStep === 'uploadLogo' && (
        <UploadLogoPopup
          onBack={handleBackFromLogoMethod}
          onClose={onClose}
          selectedProduct={selectedProduct}
          previewURL={previewURL}
          previousLogo={previousLogo}
          usePreviousLogo={usePreviousLogo}
          loading={loading}
          handleFileChange={handleFileChange}
          handleUsePreviousLogo={handleUsePreviousLogo}
          handleRemoveFile={handleRemoveFile}
          handleFinish={handleFinish}
        />
      )}
    </>
  );
};

BundleLogoPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  selectedProduct: PropTypes.object,
  previousLogo: PropTypes.string
};

export default BundleLogoPopup;
