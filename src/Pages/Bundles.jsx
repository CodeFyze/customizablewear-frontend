import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Bundles = () => {
	const [bundles, setBundles] = useState([]);

	useEffect(() => {
		const fetchBundles = async () => {
			try {
				const response = await fetch(`${apiUrl}/bundle`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
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
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
					Uniform Deals that Add Up: SAVE UP TO 60% ON OUR MIX & MATCH BUNDLES
				</h2>

				<div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
					{bundles.map((bundle) => (
						<div key={bundle._id} className='group relative'>
							<Link to={`/bundle/${bundle._id}`}>
								<div className='aspect-square w-full rounded-md bg-gray-200 overflow-hidden'>
									<img
										src={bundle.thumbnail} // Changed from bundle.image to bundle.thumbnail
										alt={bundle.title} // Changed from bundle.name to bundle.title
										className='w-full h-full object-cover object-center'
										onError={(e) => {
											e.target.src = 'https://via.placeholder.com/300'; // Fallback image
										}}
									/>
								</div>
								<div className='mt-4 text-center'>
									<h3 className='text-lg font-medium text-gray-900'>{bundle.title}</h3>
									<p className='mt-1 text-sm text-gray-700'>${bundle.price}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Bundles;
