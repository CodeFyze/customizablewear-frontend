// BundleSelectionPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BundleSelectionPage = () => {
	const { category } = useParams();
	const [products, setProducts] = useState([]);
	const [selectedPoloShirts, setSelectedPoloShirts] = useState([]);
	const [selectedSweatshirts, setSelectedSweatshirts] = useState([]);
	const [selectedJackets, setSelectedJackets] = useState([]);
	const [categoryImage, setCategoryImage] = useState('');

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const token = localStorage.getItem('authToken');

				const response = await fetch(`http://localhost:5000/api/bundle/category/${category}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch products');
				}

				const data = await response.json();
				setProducts(data.products);

				// Set the category image (assuming the first product's image represents the category)
				if (data.products.length > 0) {
					setCategoryImage(data.products[0].image);
				}
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchProducts();
	}, [category]);

	// Handle product selection
	const handleSelectProduct = (product, type) => {
		if (type === 'polo' && selectedPoloShirts.length < 3) {
			setSelectedPoloShirts([...selectedPoloShirts, product]);
		} else if (type === 'sweatshirt' && selectedSweatshirts.length < 2) {
			setSelectedSweatshirts([...selectedSweatshirts, product]);
		} else if (type === 'jacket' && selectedJackets.length < 1) {
			setSelectedJackets([...selectedJackets, product]);
		}
	};

	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				{/* Bundle Title */}
				<h2 className='text-2xl font-bold tracking-tight text-gray-900'>{category} Bundle</h2>

				{/* Image and Selection Section */}
				<div className='mt-6 flex flex-col lg:flex-row lg:space-x-8'>
					{/* Category Image on the Left */}
					<div className='w-full lg:w-1/2'>
						<img src={categoryImage} alt={`${category} Bundle`} className='w-full h-auto rounded-lg' />
					</div>

					{/* Product Selection on the Right */}
					<div className='w-full lg:w-1/2 mt-6 lg:mt-0'>
						{/* Polo Shirts Selection */}
						<div className='mt-4'>
							<h3 className='text-lg font-medium text-gray-900'>Select 3 Polo Shirts</h3>
							<p className='text-sm text-gray-500'>{selectedPoloShirts.length} / 3 selected</p>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
								{products
									.filter((product) => product.productType.includes('polo'))
									.map((product) => (
										<div
											key={product._id}
											onClick={() => handleSelectProduct(product, 'polo')}
											className={`border p-4 rounded-lg cursor-pointer ${
												selectedPoloShirts.includes(product) ? 'border-indigo-500' : 'border-gray-200'
											}`}>
											<img src={product.image} alt={product.description} className='w-full h-48 object-cover' />
											<h5 className='text-sm font-medium text-gray-900 mt-2'>{product.name}</h5>
											<p className='text-sm text-gray-500'>{product.price}</p>
										</div>
									))}
							</div>
						</div>

						{/* Sweatshirts Selection */}
						<div className='mt-6'>
							<h3 className='text-lg font-medium text-gray-900'>Select 2 Sweatshirts</h3>
							<p className='text-sm text-gray-500'>{selectedSweatshirts.length} / 2 selected</p>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
								{products
									.filter((product) => product.productType.includes('sweatshirt'))
									.map((product) => (
										<div
											key={product._id}
											onClick={() => handleSelectProduct(product, 'sweatshirt')}
											className={`border p-4 rounded-lg cursor-pointer ${
												selectedSweatshirts.includes(product) ? 'border-indigo-500' : 'border-gray-200'
											}`}>
											<img src={product.image} alt={product.description} className='w-full h-48 object-cover' />
											<h5 className='text-sm font-medium text-gray-900 mt-2'>{product.name}</h5>
											<p className='text-sm text-gray-500'>{product.price}</p>
										</div>
									))}
							</div>
						</div>

						{/* Jackets & Gilets Selection */}
						<div className='mt-6'>
							<h3 className='text-lg font-medium text-gray-900'>Select 1 Softshell Jacket or Gilet</h3>
							<p className='text-sm text-gray-500'>{selectedJackets.length} / 1 selected</p>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
								{products
									.filter((product) => product.productType.includes('jacket') || product.productType.includes('gilet'))
									.map((product) => (
										<div
											key={product._id}
											onClick={() => handleSelectProduct(product, 'jacket')}
											className={`border p-4 rounded-lg cursor-pointer ${
												selectedJackets.includes(product) ? 'border-indigo-500' : 'border-gray-200'
											}`}>
											<img src={product.image} alt={product.description} className='w-full h-48 object-cover' />
											<h5 className='text-sm font-medium text-gray-900 mt-2'>{product.name}</h5>
											<p className='text-sm text-gray-500'>{product.price}</p>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>

				{/* Add to Cart Button */}
				<div className='mt-6'>
					<button
						disabled={selectedPoloShirts.length < 3 || selectedSweatshirts.length < 2 || selectedJackets.length < 1}
						className='w-full bg-indigo-600 text-white py-3 px-6 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed'>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default BundleSelectionPage;
