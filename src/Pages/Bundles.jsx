// Homepage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

	const apiUrl = import.meta.env.VITE_API_BASE_URL; 

console.log(apiUrl)
const Bundles = () => {
	const [bundles, setBundles] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const token = localStorage.getItem('authToken');
				console.log(apiUrl)
				const response = await fetch(`${apiUrl}/bundle`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch categories');
				}

				const data = await response.json();
				console.log(data);
				setBundles(data.bundles); // Use `data.categories`
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
					Uniform Deals that Add Up: SAVE UP TO 60% ON OUR MIX & MATCH BUNDLES
				</h2>

				<div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
					{bundles.map((bundle, index) => (
						<div key={index} className='group relative'>
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
