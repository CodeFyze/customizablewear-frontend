import React, { useState, useEffect } from 'react';

const PromoCodes = () => {
	const [promoCodes, setPromoCodes] = useState([]);
	const [code, setCode] = useState('');
	const [discount, setDiscount] = useState('');
	const [editId, setEditId] = useState(null);
	const [editField, setEditField] = useState(null);
	const [editValue, setEditValue] = useState('');
	const API_URL = 'http://localhost:5000/api/promocodes';

	useEffect(() => {
		fetchPromoCodes();
	}, []);

	const fetchPromoCodes = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) return console.error('No auth token found');

		try {
			const response = await fetch(`${API_URL}/all`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			});
			if (!response.ok) throw new Error('Failed to fetch promo codes');
			const data = await response.json();
			setPromoCodes(data.promos);
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleAddPromoCode = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('authToken');
		if (!token) return console.error('No auth token found');

		const newCode = { code, discount: parseFloat(discount), status: 'active' };
		try {
			const response = await fetch(`${API_URL}/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify(newCode),
			});
			if (!response.ok) throw new Error('Failed to add promo code');

			fetchPromoCodes();
			setCode('');
			setDiscount('');
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleDeletePromoCode = async (id) => {
		const token = localStorage.getItem('authToken');
		if (!token) return console.error('No auth token found');

		try {
			const response = await fetch(`${API_URL}/delete/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!response.ok) throw new Error('Failed to delete promo code');

			fetchPromoCodes();
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleToggleStatus = async (id, currentStatus) => {
		const token = localStorage.getItem('authToken');
		if (!token) return console.error('No auth token found');

		const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
		try {
			const response = await fetch(`${API_URL}/toggle/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({ status: newStatus }),
			});
			if (!response.ok) throw new Error('Failed to update status');

			setPromoCodes((prev) => prev.map((promo) => (promo._id === id ? { ...promo, status: newStatus } : promo)));
		} catch (error) {
			console.error(error.message);
		}
	};

	const generateRandomCode = () => {
		const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
		setCode(randomCode);
	};

	return (
		<div className='p-6 max-w-3xl mx-auto'>
			<h2 className='text-2xl font-bold mb-4 text-center'>Manage Promo Codes</h2>

			{/* Add Promo Code Form */}
			<form onSubmit={handleAddPromoCode} className='flex gap-2 mb-6'>
				<input
					onChange={(e) => setCode(e.target.value)}
					type='text'
					value={code}
					placeholder='Promo Code'
					className='border p-2 flex-grow rounded-md bg-gray-100'
				/>
				<input
					type='number'
					value={discount}
					onChange={(e) => setDiscount(e.target.value)}
					placeholder='Discount %'
					className='border p-2 w-24 rounded-md'
					required
				/>
				<button type='button' onClick={generateRandomCode} className='bg-blue-500 text-white px-3 py-1 rounded-md'>
					Generate
				</button>
				<button type='submit' className='bg-green-500 text-white px-3 py-1 rounded-md'>
					Add
				</button>
			</form>

			{/* Promo Codes List */}
			<div className='grid gap-4'>
				{promoCodes.map((promo) => (
					<div key={promo._id} className='p-4 border rounded-md shadow-md flex justify-between items-center'>
						<div>
							<span className='font-semibold'>{promo.code}</span>
						</div>

						{/* Toggle and Delete Button Container */}
						<div className='flex items-center gap-2'>
							{/* Toggle Switch */}
							<div
								className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
									promo.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
								}`}
								onClick={() => handleToggleStatus(promo._id, promo.status)}>
								<div
									className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
										promo.status === 'active' ? 'translate-x-7' : 'translate-x-0'
									}`}></div>
							</div>

							{/* Delete Button */}
							<button
								onClick={() => handleDeletePromoCode(promo._id)}
								className='bg-red-500 text-white px-2 py-1 rounded-md'>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PromoCodes;
