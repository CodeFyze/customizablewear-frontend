import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import ConfirmationModal from './ConfirmationModal';
import { ClipLoader } from 'react-spinners'; // Import a spinner component

const Products = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isAdding, setIsAdding] = useState(false); // Loading state for add
	const [isDeleting, setIsDeleting] = useState(false); // Loading state for delete
	const [isFetching, setIsFetching] = useState(false); // Loading state for fetch
	const apiUrl = import.meta.env.VITE_API_BASE_URL;

	const fetchProducts = async () => {
		setIsFetching(true);
		try {
			const response = await fetch(`${apiUrl}/products`, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) throw new Error('Failed to fetch products');

			const data = await response.json();

			if (data.success && Array.isArray(data.products)) {
				setProducts(data.products);
			} else {
				console.error('Unexpected API response:', data);
				toast.error('Unexpected response format from API', { position: 'top-right' });
			}
		} catch (error) {
			console.error('Error fetching products:', error);
			toast.error('Failed to fetch products', { position: 'top-right' });
		} finally {
			setIsFetching(false);
		}
	};

	const handleAddProduct = (newProduct) => {
		setProducts((prevProducts) => [...prevProducts, newProduct]);
	};

	const handleProductSubmit = async (productData) => {
		setIsAdding(true);
		try {
			const formData = new FormData();
			formData.append('title', productData.title);
			formData.append('price', productData.price);

			// Add images
			if (productData.images) {
				productData.images.forEach((image) => {
					formData.append('images', image);
				});
			}
			if (productData.front) formData.append('front', productData.front);
			if (productData.back) formData.append('back', productData.back);
			if (productData.side) formData.append('side', productData.side);

			// Add colors
			if (productData.colors) {
				productData.colors.forEach((color) => {
					formData.append('colors', color);
				});
			}

			let response;
			if (selectedProduct) {
				response = await fetch(`${apiUrl}/products/update/${selectedProduct._id}`, {
					credentials: 'include',
					method: 'PUT',
					body: formData,
				});
			} else {
				response = await fetch(`${apiUrl}/products/add`, {
					credentials: 'include',
					method: 'POST',
					body: formData, // Removed JSON.stringify as we're using FormData
				});
			}

			if (!response.ok) throw new Error('Failed to save product');
			const savedProduct = await response.json();

			if (selectedProduct) {
				setProducts((prevProducts) =>
					prevProducts.map((product) => (product._id === selectedProduct._id ? savedProduct.product : product)),
				);
				toast.success('Product updated successfully!', { position: 'top-right' });
			} else {
				handleAddProduct(savedProduct.product);
				toast.success('Product added successfully!', { position: 'top-right' });
			}
		} catch (error) {
			console.error('Error saving product:', error);
			toast.error('Failed to save product', { position: 'top-right' });
		} finally {
			setIsAdding(false);
			setIsModalOpen(false);
		}
	};

	const handleDeleteProduct = async (productId) => {
		setIsDeleting(true);
		try {
			const response = await fetch(`${apiUrl}/products/delete/${productId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			if (!response.ok) throw new Error('Failed to delete product');
			setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
			toast.success('Product deleted successfully!', { position: 'top-right' });
		} catch (error) {
			console.error('Error deleting product:', error);
			toast.error('Failed to delete product', { position: 'top-right' });
		} finally {
			setIsDeleting(false);
			setIsDeleteModalOpen(false);
		}
	};

	// Filter products based on search term (name or price)
	const filteredProducts = products.filter((product) => {
		const matchesName = product.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesPrice = product.price.toString().includes(searchTerm);
		return matchesName || matchesPrice;
	});

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='p-4'>
			{/* Title and Add Product Button */}
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-semibold text-gray-800'>Products</h1>
				<button
					onClick={() => {
						setSelectedProduct(null);
						setIsModalOpen(true);
					}}
					className='bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center justify-center min-w-32'
					disabled={isAdding}>
					{isAdding ? <ClipLoader color='#ffffff' size={20} /> : 'Add Product'}
				</button>
			</div>

			{/* Search Bar */}
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Search by product name or price'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
				/>
			</div>

			{/* Loading state for initial fetch */}
			{isFetching && (
				<div className='flex justify-center my-8'>
					<ClipLoader color='#f97316' size={40} />
				</div>
			)}

			{/* Product Count Display */}
			{!isFetching && (
				<div className='mb-4 text-gray-600'>
					<p className='text-lg'>Total Products: {filteredProducts.length}</p>
				</div>
			)}

			{/* Product Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{filteredProducts.map((product) => (
					<div key={product._id} className='bg-white shadow rounded-lg p-4'>
						<img
							src={product.frontImage || product.backImage || product.sideImage}
							alt={product.title}
							className='w-32 h-32 object-cover rounded-lg mb-4 mx-auto'
						/>
						<h2 className='text-lg font-semibold'>{product.title}</h2>
						<p>${product.price}</p>
						<div className='flex space-x-2 mt-4'>
							<button
								onClick={() => {
									setSelectedProduct(product);
									setIsModalOpen(true);
								}}
								className='bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600'
								disabled={isAdding}>
								Update
							</button>
							<button
								onClick={() => {
									setSelectedProduct(product);
									setIsDeleteModalOpen(true);
								}}
								className='bg-black text-white px-4 py-2 rounded hover:bg-red-700'
								disabled={isDeleting}>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			<ToastContainer />

			{/* Modals */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleProductSubmit}
				initialData={selectedProduct}
				onProductAdded={handleAddProduct}
				isLoading={isAdding}
			/>

			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={() => handleDeleteProduct(selectedProduct?._id)}
				isLoading={isDeleting}
			/>
		</div>
	);
};

export default Products;
