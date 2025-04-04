import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PoloSelector from '../components/poloBundle';

const BundleSelectionPage = () => {
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState('');
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await fetch(`${apiUrl}/bundle/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials:"include"
        });

        if (response.ok) {
          const data = await response.json();
          setThumbnail(data.bundle?.thumbnail || '');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchThumbnail();
  }, [id, apiUrl]);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col lg:flex-row lg:space-x-8 h-[calc(100vh-200px)]'>
          {/* Left side - Fixed thumbnail */}
          <div className='w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:py-8'>
            <div className='lg:pr-4'>
              <img
                src={thumbnail}
                alt='Bundle thumbnail'
                className='w-full h-auto rounded-lg max-h-[80vh] object-contain'
              />
            </div>
          </div>
          
          {/* Right side - Scrollable content */}
          <div className='w-full lg:w-1/2  lg:overflow-y-auto lg:max-h-[calc(100vh-200px)] lg:py-8'>
            <PoloSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleSelectionPage;