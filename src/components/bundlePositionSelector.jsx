import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import LargeBack from '../assets/shirtlogos/bottom-back_so_large.png';
import LargeFront from '../assets/shirtlogos/bottom-left_pk_large.png';
import LeftBreast from '../assets/shirtlogos/bottom-right_k4_large.png';
import LeftSleeve from '../assets/shirtlogos/sleeve-left_1f_large.png';
import NapeOfNeck from '../assets/shirtlogos/nape-of-neck_dq_large.png';
import RightBreast from '../assets/shirtlogos/right-chest_no_large.png';
import RightSleeve from '../assets/shirtlogos/sleeve-right_ju_large.png';

const PositionPopup = ({ 
  onClose, 
  onBack, 
  onNext, 
  initialSelectedPositions = {
    'Polo Shirts': [],
    'Sweatshirts': []
  } 
}) => {
  const positionImages = {
    'Large Back': LargeBack,
    'Large Front': LargeFront,
    'Left Breast': LeftBreast,
    'Left Sleeve': LeftSleeve,
    'Nape of Neck': NapeOfNeck,
    'Right Breast': RightBreast,
    'Right Sleeve': RightSleeve
  };

  const garmentTypes = [
    {
      name: 'Polo Shirts',
      positions: [
        'Left Breast',
        'Right Breast',
        'Right Sleeve',
        'Nape of Neck',
        'Large Front',
        'Large Back',
        'Left Sleeve'
      ]
    },
    {
      name: 'Sweatshirts',
      positions: [
        'Left Breast',
        'Right Breast',
        'Right Sleeve',
        'Nape of Neck',
        'Large Front',
        'Large Back',
        'Left Sleeve'
      ]
    },
  ];

  const [selectedPositions, setSelectedPositions] = useState(initialSelectedPositions);

  const togglePosition = (garmentName, position) => {
    setSelectedPositions(prev => {
      const currentPositions = prev[garmentName] ? [...prev[garmentName]] : [];
      const positionIndex = currentPositions.indexOf(position);
      
      if (positionIndex === -1) {
        currentPositions.push(position);
      } else {
        currentPositions.splice(positionIndex, 1);
      }
      
      return {
        ...prev,
        [garmentName]: currentPositions
      };
    });
  };

  const isNextEnabled = Object.values(selectedPositions).some(
    positions => positions.length > 0
  );

  const allSelectedPositions = garmentTypes
    .flatMap(garment => selectedPositions[garment.name] || [])
    .filter(Boolean)
    .join(', ') || 'None';

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
      <div className='bg-white p-6 md:p-8 rounded-lg w-[90%] max-w-2xl mx-auto relative max-h-[80vh] overflow-y-auto'>
        <button 
          className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <div className='font-semibold text-lg md:text-xl text-center mb-4'>Choose Position(s)</div>
        <div className='text-sm text-center text-gray-700 mb-6'>
          Selected: {allSelectedPositions}
        </div>
        <div className='text-sm text-blue-500 text-center mb-6'>
          Note: Additional logos can be added after the first one has been uploaded.
        </div>

        {garmentTypes.map((garment) => (
          <div key={garment.name} className='mb-8'>
            <h2 className='font-semibold text-lg md:text-xl mb-4'>{garment.name}</h2>
            
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {garment.positions.map((position) => {
                const isSelected = selectedPositions[garment.name]?.includes(position) || false;
                return (
                  <div
                    key={`${garment.name}-${position}`}
                    className={`flex flex-col items-center cursor-pointer p-2 rounded-md border-2 transition-all ${
                      isSelected ? 'border-green-500 bg-green-50' : 'border-orange-500 hover:border-orange-600'
                    }`}
                    onClick={() => togglePosition(garment.name, position)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && togglePosition(garment.name, position)}
                  >
                    <img 
                      src={positionImages[position]} 
                      alt={position} 
                      className='rounded-md object-cover w-24 h-24 mb-2' 
                      loading="lazy"
                    />
                    <div className='text-sm font-medium text-center'>{position}</div>
                    {isSelected && (
                      <div className='text-xs text-green-600 mt-1'>Selected</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className='flex justify-between items-center mt-6'>
          <button 
            className='bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg w-32 text-center transition-colors'
            onClick={onBack}
          >
            BACK
          </button>
          <button 
            className={`py-2 px-4 rounded-lg w-32 text-center transition-colors ${
              isNextEnabled 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isNextEnabled}
            onClick={() => onNext(selectedPositions)}
          >
            NEXT STEP
          </button>
        </div>
      </div>
    </div>
  );
};

PositionPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  initialSelectedPositions: PropTypes.shape({
    'Polo Shirts': PropTypes.arrayOf(PropTypes.string),
    'Sweatshirts': PropTypes.arrayOf(PropTypes.string)
  })
};

export default PositionPopup;