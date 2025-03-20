// Homepage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Bundles = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const token = localStorage.getItem('authToken');
				const response = await fetch('http://localhost:5000/api/bundle/categories', {
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
				setCategories(data.categories); // Use `data.categories`
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
					{categories.map((category, index) => (
						<div key={index} className='group relative'>
							<Link to={`bundle/category/${category.name}`}>
								<div className='aspect-square w-full rounded-md bg-gray-200 overflow-hidden'>
									<img
										src={category.image} // Display the category image
										alt={category.name}
										className='w-full h-full object-cover object-center'
									/>
								</div>
								<h3 className='mt-2 text-lg font-medium text-gray-900 text-center'>{category.name}</h3>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Bundles;
