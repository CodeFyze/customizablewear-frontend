import React, { useState, useEffect } from 'react';
import Popup from './bundlePopUp';

const Bundle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bundleType, setBundleType] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noBundlesAvailable, setNoBundlesAvailable] = useState(false);

  // Fetch bundles from backend when component mounts
  const fetchBundles = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/bundle/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setNoBundlesAvailable(true);
          setBundles([]);
          return;
        }
        throw new Error(`Server responded with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || (Array.isArray(data) && data.length === 0) || 
          (data.bundles && data.bundles.length === 0)) {
        setNoBundlesAvailable(true);
        setBundles([]);
      } else {
        const bundlesData = data.bundles || data;
        const bundlesWithLoading = bundlesData.map(bundle => ({
          ...bundle,
          imageLoaded: false
        }));
        setBundles(bundlesWithLoading);
        setNoBundlesAvailable(false);
      }
    } catch (err) {
      console.error('Error fetching bundles:', err);
      setError(err.message);
      setNoBundlesAvailable(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  const handleImageLoad = (bundleId) => {
    setBundles(prevBundles => 
      prevBundles.map(bundle => 
        bundle._id === bundleId 
          ? { ...bundle, imageLoaded: true } 
          : bundle
      )
    );
  };

  const handleButtonClick = (type) => {
    setBundleType(type);
    setIsPopupOpen(true);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleBundleCreated = (newBundle) => {
    setBundles(prev => [...prev, { ...newBundle, imageLoaded: false }]);
    setNoBundlesAvailable(false);
  };

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchBundles();
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mb-4"></div>
        <p>Loading bundles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={retryFetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Select Bundle
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => handleButtonClick('solo1')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Solo Bundle 1
              </button>
              <button
                onClick={() => handleButtonClick('solo2')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Solo Bundle 2
              </button>
              <button
                onClick={() => handleButtonClick('everyday')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Everyday Bundle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Display created bundles with improved image loading */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Bundles</h2>
        
        {noBundlesAvailable ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No bundles available</p>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Your First Bundle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundles.map((bundle) => (
              <div key={bundle._id} className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  {/* Thumbnail Image with loading state */}
                  <div className="relative h-48 bg-gray-200 rounded overflow-hidden">
                    {bundle.thumbnail && (
                      <>
                        <img 
                          src={bundle.thumbnail.startsWith('http') ? 
                               bundle.thumbnail : 
                               `http://localhost:5000/${bundle.thumbnail}`}
                          alt={bundle.title} 
                          className={`w-full h-full object-cover ${!bundle.imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                          onError={(e) => {
                            console.error('Error loading image:', bundle.thumbnail);
                            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                            handleImageLoad(bundle._id);
                          }}
                          onLoad={() => handleImageLoad(bundle._id)}
                        />
                        {!bundle.imageLoaded && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                            <span className="text-gray-500">Loading...</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Bundle Details */}
                  <div className="mt-4">
                    <h3 className="font-medium text-lg">{bundle.title}</h3>
                    <p className="text-gray-600 font-bold">${bundle.price}</p>
                    <p className="text-sm text-gray-500 mt-2">{bundle.description}</p>
                    
                    {/* Categories */}
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-blue-600">
                        {bundle.categories?.join(', ')}
                      </span>
                    </div>
                    
                    {/* Sizes */}
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-gray-600">
                        Sizes: {bundle.size?.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <Popup
          closePopup={() => setIsPopupOpen(false)}
          onBundleCreated={handleBundleCreated}
        />
      )}
    </div>
  );
};

export default Bundle;