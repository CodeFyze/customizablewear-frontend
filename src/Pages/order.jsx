import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
	FaBox,
	FaShoppingCart,
	FaPalette,
	FaRuler,
	FaCheckCircle,
	FaMapMarkerAlt,
	FaInfoCircle,
	FaEye,
	FaDownload,
} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
	const { orderId } = useParams();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState('Pending'); // State for dropdown value

	const API_URL = `http://localhost:5000/api/orders/orders/${orderId}`;

	const fetchOrderDetails = async () => {
		
		try {
			const token = localStorage.getItem('authToken');

			if (!token) {
				throw new Error('Unauthorized - No token found.');
			}

			const response = await fetch(API_URL, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to fetch order details');
			}

			const data = await response.json();
			setOrder(data.order);
			setStatus(data.order.status); // Set initial status from fetched order
		} catch (error) {
			console.error('Error fetching order details:', error);
			setError(error.message || 'Failed to fetch order details');
			toast.error(error.message, { position: 'top-right' });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrderDetails();
	}, [ orderId ]);

	const handleStatusChange = async (newStatus) => {
		try {
			const token = localStorage.getItem('authToken');

			if (!token) {
				throw new Error('Unauthorized - No token found.');
			}

			const response = await fetch(`http://localhost:5000/api/orders/update/${orderId}`, {
				method: 'PUT', 
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ status: newStatus }), 
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to update order status');
			}

			const data = await response.json();
			setOrder({ ...order, status: newStatus });
			toast.success('Order status updated successfully!', { position: 'top-right' });
		} catch (error) {
			console.log(error)
			console.error('Error updating order status:', error);
			toast.error(error.message || 'Failed to update order status', { position: 'top-right' });
		}
	};

	const handleDownload = async (imageUrl) => {
		try {
			const response = await fetch(imageUrl, { mode: 'cors' });
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'custom-logo.png';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading image:', error);
			toast.error('Failed to download image. Please try again.', { position: 'top-right' });
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen bg-gray-100'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center min-h-screen bg-gray-100'>
				<p className='text-red-500 text-lg'>{error}</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
			{/* Page Title */}
			<h1 className='text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center'>
				<FaBox className='mr-2' /> Order Details
			</h1>

			{/* Order Card */}
			<div className='max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden'>
				{/* Order Status */}
				<div className='p-6 border-b border-gray-200'>
					<h2 className='text-xl font-semibold mb-4 flex items-center'>
						<FaCheckCircle className='mr-2 text-gray-700' /> Order Status
					</h2>
					<div className='space-y-2'>
						<p className='text-gray-700'>
							<strong>Order ID:</strong> {order._id}
						</p>
						<div className='flex items-center gap-2'>
							<strong>Status:</strong>
							<select
								value={status}
								onChange={(e) => {
									setStatus(e.target.value);
									handleStatusChange(e.target.value);
								}}
								className={`px-2 py-1 rounded-full text-sm font-medium ${
									status === 'Delivered'
										? 'bg-green-100 text-green-700'
										: status === 'Pending'
										? 'bg-yellow-100 text-yellow-700'
										: status === 'Cancelled'
										? 'bg-red-100 text-red-700'
										: 'bg-gray-100 text-gray-700'
								}`}>
								<option value='Pending'>Pending</option>
								<option value='Confirmed'>Confirmed</option>
								<option value='Shipped'>Shipped</option>
								<option value='Delivered'>Delivered</option>
								<option value='Cancelled'>Cancelled</option>
							</select>
						</div>
						<p className='text-gray-700'>
							<strong>Placed on:</strong> {new Date(order.createdAt).toLocaleDateString()}
						</p>
						<p className='text-gray-700'>
							<strong>Total Amount:</strong> ${order.finalAmount.toFixed(2)}
						</p>
						<p className='text-gray-700'>
							<strong>Payment:</strong> {order.paymentMode} ({order.paymentStatus})
						</p>
					</div>
				</div>

				{/* Shipping Address */}
				<div className='p-6 border-b border-gray-200'>
					<h2 className='text-xl font-semibold mb-4 flex items-center'>
						<FaMapMarkerAlt className='mr-2 text-gray-700' /> Shipping Address
					</h2>
					<div className='space-y-2'>
						<p className='text-gray-700 font-semibold'>
							{order.shippingAddress.firstName} {order.shippingAddress.lastName}
						</p>
						<p className='text-gray-600'>{order.shippingAddress.address}</p>
						<p className='text-gray-600'>Email: {order.shippingAddress.email}</p>
						<p className='text-gray-600'>Phone: {order.shippingAddress.phone}</p>
					</div>
				</div>

				{/* Products List */}
				<div className='p-6'>
					<h2 className='text-xl font-semibold mb-4 flex items-center'>
						<FaShoppingCart className='mr-2 text-gray-700' /> Products Ordered
					</h2>
					<div className='space-y-4'>
						{order.products.map((item, index) => (
							<div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
								{/* Horizontal Layout */}
								<div className='flex flex-col md:flex-row items-center gap-4'>
									{/* Product Image */}
									<div className='flex-shrink-0'>
										<img src={item.frontImage} alt={item.title} className='w-20 h-20 object-cover rounded-md' />
									</div>

									{/* Product Details */}
									<div className='flex-1'>
										<p className='text-lg font-semibold text-gray-800'>{item.title}</p>
										<div className='space-y-2 mt-2'>
											<p className='text-sm text-gray-600 flex items-center'>
												<FaPalette className='mr-2' /> Color:
												<span
													className='w-4 h-4 inline-block ml-2 border border-gray-400 rounded-full'
													style={{ backgroundColor: item.color }}></span>
											</p>
											<p className='text-sm text-gray-600 flex items-center'>
												<FaRuler className='mr-2' /> Size: {item.size}
											</p>
											<p className='text-sm text-gray-600 flex items-center'>
												<FaCheckCircle className='mr-2' /> Method: {item.method}
											</p>
											<p className='text-sm text-gray-600 flex items-center'>
												<FaCheckCircle className='mr-2' /> Position: {item.position}
											</p>
											<p className='text-sm text-gray-600 flex items-center'>
												<FaShoppingCart className='mr-2' /> Quantity: {item.quantity}
											</p>
										</div>

										{/* Custom Logo Section */}
										{item.logo && (
											<div className='mt-4'>
												<h2 className='text-sm font-bold text-gray-800 mb-2'>Custom Logo:</h2>
												<div className='flex items-center gap-3'>
													<img src={item.logo} alt='Custom Logo' className='w-16 h-16 object-cover rounded-md border' />
													<div className='flex space-x-3'>
														<button
															onClick={() => window.open(item.logo, '_blank')}
															className='text-blue-600 hover:text-blue-800 flex items-center transition-colors'>
															<FaEye className='mr-1' /> View
														</button>
														<button
															onClick={() => handleDownload(item.logo)}
															className='text-blue-600 hover:text-blue-800 flex items-center transition-colors'>
															<FaDownload className='mr-1' /> Download
														</button>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default OrderDetails;