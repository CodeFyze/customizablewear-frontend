import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { Audio } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSuccess } from '../store/authSlice';
const apiUrl = import.meta.env.VITE_API_BASE_URL; 
const LoginPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = async (data) => {
		console.log('🚀 Sending login request:', data);

		try {
			setLoading(true);
			const response = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});

			const result = await response.json();
			console.log('🚀 Response from server:', result);

			if (response.ok && result.success) {
				toast.success('✅ Login successful!');

				dispatch(
					loginSuccess({
						token: result.token,
						user: result.user,
						isAuthenticated:true
					}),
				);

				// Check if the user was redirected from the "" button
				const { from, openPopup } = location.state || { from: null, openPopup: false };

				if (from) {
					// Redirect back to the "Add Logo" page and open the popup
					navigate(from, { state: { openPopup } });
				} else {
					// Default behavior: Redirect based on user role
					if (result.user?.role === 'seller') {
						navigate('/seller');
					} else {
						navigate('/');
					}
				}
			} else {
				toast.error(result.message || 'Invalid email or password.');
			}
		} catch (error) {
			console.error('Login error:', error);
			toast.error('❌ An error occurred during login. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		navigate(-1); // Navigate back to the previous page
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative'>
				{loading && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
						<Audio height='100' width='100' color='white' ariaLabel='loading' />
					</div>
				)}

				<button onClick={handleClose} className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2'>
					<FaTimes size={20} />
				</button>

				<h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>{isLogin ? 'Login' : 'Signup'}</h2>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex flex-col'>
						<label className='text-sm font-medium text-gray-600'>Email</label>
						<input
							type='email'
							placeholder='Enter your email'
							className='mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							{...register('email', { required: 'Email is required' })}
						/>
						{errors.email && <span className='text-sm text-red-500 mt-1'>{errors.email.message}</span>}
					</div>

					<div className='flex flex-col relative'>
						<label className='text-sm font-medium text-gray-600'>Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Enter your password'
							className='mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							{...register('password', { required: 'Password is required' })}
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-10 text-gray-500 hover:text-gray-700'>
							{showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
						</button>
						{errors.password && <span className='text-sm text-red-500 mt-1'>{errors.password.message}</span>}
					</div>

					<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
						Login
					</button>
				</form>

				<div className='mt-4 text-center'>
					<span className='text-sm text-gray-600'>Don't have an account?</span>
					<button onClick={() => navigate('/signup')} className='ml-2 text-blue-500 hover:underline'>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
