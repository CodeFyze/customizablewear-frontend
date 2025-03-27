import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Bundles = () => {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${apiUrl}/bundle`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bundles');
        }

        const data = await response.json();
        console.log('Bundles data:', data);
        setBundles(data.bundles || []);
      } catch (error) {
        console.error('Error fetching bundles:', error);
      }
    };

    fetchBundles();
  }, []);

	return (
		<div className=''>
			<div className=' mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
					<span className='text-[#002DA1] font-bold'>Uniform Deals that Add Up: </span>SAVE UP TO <span className='text-[#FF4545]'>60%</span>  ON <br /> OUR MIX & MATCH BUNDLES
				</h2>

				<div className='mt-6 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-3'>
					{bundles.map((bundle, index) => (
						
						<div key={index} className='group relative shadow-md'>
							{console.log(bundle)
							}
							<Link to={`bundle/bundle/${bundle.name}`}>
								<div className='aspect-square w-full rounded-md bg-gray-200 overflow-hidden'>
									<img
										src={bundle.image} // Display the bundle image
										alt={bundle.name}
										className='w-full h-full object-cover object-center'
									/>
								</div>
								<h3 className='mt-2 text-lg font-medium text-gray-900 text-center'>{bundle.name}</h3>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Bundles;