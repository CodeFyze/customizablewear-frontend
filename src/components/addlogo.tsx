import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AddLogoPopup = ({ onBack, onNext, onUpload, onClose }) => {
	const handleClose = (e) => {
		e.stopPropagation(); 
		if (onClose) {
			onClose(); 
		} else {
			console.warn('onClose function is not defined');
		}
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative'>
				<button onClick={handleClose} className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'>
					<FaTimes size={20} />
				</button>

				<div className='text-center'>
					<h2 className='text-2xl font-bold mb-4'>Add Your Logo</h2>
					<p className='text-gray-600 mb-6'>Choose a method of adding your logo</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='text-center p-4 border rounded-lg hover:shadow-md cursor-pointer' onClick={onNext}>
						<div className='bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3'>
							<span className='text-4xl font-bold'>T</span>
						</div>
						<h3 className='font-semibold mb-2'>Text Logo</h3>
						<p className='text-sm text-gray-500'>
							Add a basic font to your garments. For example, a company, club, or employee name.
						</p>
					</div>

					<div className='text-center p-4 border rounded-lg hover:shadow-md cursor-pointer' onClick={onUpload}>
						<div className='bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 12v3m16-3v3M4 15h16m-7-3V3m-2 9V3m0 9h-2.5m2.5 0h2.5m5.5-3h-1.5a2.5 2.5 0 010-5h1.5'
								/>
							</svg>
						</div>
						<h3 className='font-semibold mb-2'>Upload Your Logo</h3>
						<p className='text-sm text-gray-500'>Your setup will be completely free!</p>
					</div>
				</div>
				<div className='flex justify-center mt-6'>
					<button
						onClick={onBack}
						className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none'>
						Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddLogoPopup;
