import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const UploadLogoPopup = ({
	onBack,
	onClose,
	selectedProduct,
	previewURL,
	previousLogo,
	usePreviousLogo,
	loading,
	handleFileChange,
	handleUsePreviousLogo,
	handleRemoveFile,
	handleFinish
}) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 relative'>
				{/* Close Button */}
				<button onClick={onClose} className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'>
					<FaTimes size={20} />
				</button>

				<div className='text-center'>
					<h2 className='text-2xl font-bold mb-2'>Upload Your Logo</h2>
					<p className='text-gray-600 mb-4'>Upload with confidence, we have no setup fees!</p>
					<p className='text-gray-600'>Currently Selected Shirt: {selectedProduct?.title}</p>
					{selectedProduct?.frontImage && (
						<img src={selectedProduct.frontImage} alt='Selected Shirt' className='w-32 h-auto mx-auto mt-2' />
					)}
				</div>

				<div className='space-y-4'>
					{/* Upload New Logo */}
					<label htmlFor='file-upload' className='cursor-pointer'>
						<div className='bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 flex items-center justify-center mx-auto mb-3'>
							Upload New Logo
						</div>
						<input
							id='file-upload'
							type='file'
							accept='.jpg,.png,.eps,.ai,.pdf'
							className='hidden'
							onChange={handleFileChange}
						/>
					</label>

					{previewURL && (
						<div className='text-center'>
							<img src={previewURL} alt='New Logo' className='w-32 h-auto mx-auto border rounded-md' />
							<p className='text-red-500 text-sm mt-2'>An additional $5 will be charged for this new logo.</p>
							<button
								onClick={handleRemoveFile}
								className='text-sm text-gray-500 underline mt-2 hover:text-gray-700'>
								Remove Logo
							</button>
						</div>
					)}

					{/* Use Previous Logo */}
					{previousLogo && (
						<button
							onClick={handleUsePreviousLogo}
							className='mt-3 text-blue-500 underline text-sm hover:text-blue-700'>
							Use Previous Logo
						</button>
					)}

					{usePreviousLogo && previousLogo && (
						<img src={previousLogo} alt='Previous Logo' className='w-32 h-auto mx-auto mt-2 border rounded-md' />
					)}
				</div>

				<div className='flex justify-between mt-6'>
					<button onClick={onBack} className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600'>
						Back
					</button>
					<button
						onClick={handleFinish}
						className={`bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 ${
							loading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={loading}>
						{loading ? 'Adding...' : 'Finish'}
					</button>
				</div>
			</div>
		</div>
	);
};

UploadLogoPopup.propTypes = {
	onBack: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	selectedProduct: PropTypes.object,
	previewURL: PropTypes.string,
	previousLogo: PropTypes.string,
	usePreviousLogo: PropTypes.bool,
	loading: PropTypes.bool,
	handleFileChange: PropTypes.func,
	handleUsePreviousLogo: PropTypes.func,
	handleRemoveFile: PropTypes.func,
	handleFinish: PropTypes.func,
};

export default UploadLogoPopup;
