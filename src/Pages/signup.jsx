import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { Audio } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: 'user',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false); // <-- Added state for loader
	const [showForm, setShowForm] = useState(true); // <-- State to control form visibility
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch('http://localhost:5000/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			setLoading(false);
			if (response.ok && response.role == 'user') {
				navigate('/products');
			} else {
				navigate('/');
			}
		} catch (error) {
			setLoading(false);
			console.error('Error:', error);
			toast.error(error.message || 'An error occurred while signing up');
		}
	};

	return (
		<div className='h-screen flex justify-center items-center relative'>
			{/* Background overlay when loading */}
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='white' ariaLabel='loading' />
				</div>
			)}

			{/* Sign Up Form */}
			{showForm && (
				<div className='p-8 w-full max-w-6xl bg-white rounded-lg shadow-lg z-20 relative'>
					{/* Close button positioned at top-right corner */}
					<button
						onClick={() => setShowForm(false)} // Close the form
						className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'>
						<FaTimes size={20} />
					</button>

					<h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>Sign Up</h2>

					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Form Fields */}
						<div>
							<label htmlFor='firstName' className='block text-sm font-medium text-gray-600'>
								First Name
							</label>
							<input
								type='text'
								name='firstName'
								id='firstName'
								value={formData.firstName}
								onChange={handleChange}
								required
								className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
							/>
						</div>
						<div>
							<label htmlFor='lastName' className='block text-sm font-medium text-gray-600'>
								Last Name
							</label>
							<input
								type='text'
								name='lastName'
								id='lastName'
								value={formData.lastName}
								onChange={handleChange}
								required
								className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
							/>
						</div>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-600'>
								Email Address
							</label>
							<input
								type='email'
								name='email'
								id='email'
								value={formData.email}
								onChange={handleChange}
								required
								className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
							/>
						</div>
						<div className='relative mt-2'>
							<label htmlFor='password' className='block text-sm font-medium text-gray-600'>
								Password
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								name='password'
								id='password'
								value={formData.password}
								onChange={handleChange}
								required
								className='p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 pr-10'
							/>
							<button
								type='button'
								onClick={() => setShowPassword((prev) => !prev)}
								className='absolute inset-y-[63%] right-3 flex items-center justify-center h-100 text-gray-500'>
								{showPassword ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
							</button>
						</div>
						<div>
							<label htmlFor='role' className='block text-sm font-medium text-gray-600'>
								Role
							</label>
							<select
								name='role'
								id='role'
								value={formData.role}
								onChange={handleChange}
								className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'>
								<option value='user'>User</option>
								<option value='seller'>Seller</option>
							</select>
						</div>
						<div className='flex justify-center'>
							<button
								type='submit'
								className='w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
								Sign Up
							</button>
						</div>
					</form>

					<div className='mt-4 text-center text-sm text-gray-600'>
						<p>
							Already have an account?{' '}
							<a href='/login' className='text-indigo-600 hover:text-indigo-700'>
								Login here
							</a>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default SignUp;
