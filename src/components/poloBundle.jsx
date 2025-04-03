// components/PoloSelector.jsx
import React from 'react';
import { usePoloSelector } from '../hooks/usePoloSelector';
// import ProductSection from './ProductSection';
import ProductSection from './BundleSection';

const PoloSelector = () => {
  const {
    bundle,
    products,
    getProduct,
    // First product states and handlers
    selectedPoloShirts1 = [],
    selectedColors1 = [],
    isDropdownOpen1,
    isPoloShirtsOpen1,
    quantities1 = {},
    totalSelectedSizes1,
    handleSelectProduct1,
    handleColorChange1,
    handleQuantityChange1,
    toggleDropdown1,
    togglePoloShirtsSection1,
    // Second product states and handlers
    selectedPoloShirts2 = [],
    selectedColors2 = [],
    isDropdownOpen2,
    isPoloShirtsOpen2,
    quantities2 = {},
    totalSelectedSizes2,
    handleSelectProduct2,
    handleColorChange2,
    handleQuantityChange2,
    toggleDropdown2,
    togglePoloShirtsSection2,
  } = usePoloSelector();

  // Get the products for each selector
  const product1 = getProduct(0);
  const product2 = getProduct(1);

  // Check if both products have reached their size selection limits (3 sizes each)
  const bothProductsHaveMaxSizes = totalSelectedSizes1 >= 3 && totalSelectedSizes2 >= 3;

  return (
    <div className='bg-white'>
      <div className='max-w-2xl px-4 py-16 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8'>
        <div className='mt-6 flex flex-col lg:flex-row lg:space-x-8'>
          <div className='w-full lg:w-full mt-6 lg:mt-0'>
            <div className='mt-6'>
              {/* First Product Section */}
              <ProductSection
                title="Select Polo Shirt"
                product={product1}
                selectedPoloShirts={selectedPoloShirts1}
                selectedColors={selectedColors1}
                isDropdownOpen={isDropdownOpen1}
                isPoloShirtsOpen={isPoloShirtsOpen1}
                quantities={quantities1}
                totalSelectedSizes={totalSelectedSizes1}
                handleSelectProduct={handleSelectProduct1}
                handleColorChange={handleColorChange1}
                handleQuantityChange={handleQuantityChange1}
                toggleDropdown={toggleDropdown1}
                togglePoloShirtsSection={togglePoloShirtsSection1}
                sectionNumber={1}
              />

              {/* Second Product Section */}
              <ProductSection
                title="Select Polo Shirt"
                product={product2}
                selectedPoloShirts={selectedPoloShirts2}
                selectedColors={selectedColors2}
                isDropdownOpen={isDropdownOpen2}
                isPoloShirtsOpen={isPoloShirtsOpen2}
                quantities={quantities2}
                totalSelectedSizes={totalSelectedSizes2}
                handleSelectProduct={handleSelectProduct2}
                handleColorChange={handleColorChange2}
                handleQuantityChange={handleQuantityChange2}
                toggleDropdown={toggleDropdown2}
                togglePoloShirtsSection={togglePoloShirtsSection2}
                sectionNumber={2}
              />

              {/* Add Logo Button - Only shown when both products have 3 sizes selected */}
              {bothProductsHaveMaxSizes && (
                <div className="mt-8 text-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
                    onClick={() => {
                    }}
                  >
                    Add Logo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoloSelector;