import { useEffect, useState } from 'react';
import Embroidery from '../assets/images/Embroidery.jpeg';
import Print from '../assets/images/print.jpeg';
import SizePopup from './shirtpositionpopup';
import AddLogoPopup from './addlogo';
import AddTextLogoPopup from './AddTextLogoPopup';
import UploadLogoPopup from './UploadLogoPopup';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert

const Popup = ({ onClose, visible, selectedProduct, selectedSize, selectedColor }) => {
	console.log(selectedProduct, selectedSize, selectedColor);
	const [selectedMethod, setSelectedMethod] = useState('Embroidery');
	const [selectedPosition, setSelectedPosition] = useState('Large Front');
	const [showSizePopup, setShowSizePopup] = useState(false);
	const [isAddLogoPopupVisible, setIsAddLogoPopupVisible] = useState(false);
	const [isAddTextLogoPopupVisible, setIsAddTextLogoPopupVisible] = useState(false);
	const [isUploadLogoPopupVisible, setIsUploadLogoPopupVisible] = useState(false);
	const [textLogoDetails, setTextLogoDetails] = useState(null);

	useEffect(() => {
		if (visible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [visible]);

	const handleFinishTextLogo = (details) => {
		setTextLogoDetails(details);
		setIsAddTextLogoPopupVisible(false);
		setIsAddLogoPopupVisible(false);
		onClose();

		// Show SweetAlert after finishing the text logo process
		Swal.fire({
			title: 'Item Added to Cart',
			text: 'Your item has been successfully added to the cart.',
			icon: 'success',
			confirmButtonText: 'OK',
		});

		console.log('Text logo details:', details);
	};
	const handleClose = () => {
		setShowSizePopup(false);
		setIsAddLogoPopupVisible(false);
		setIsAddTextLogoPopupVisible(false);
		setIsUploadLogoPopupVisible(false);
		onClose(); // This closes the main popup
	};

	if (!visible) return null;

	return (
		<>
			{!showSizePopup && !isAddLogoPopupVisible && !isAddTextLogoPopupVisible && !isUploadLogoPopupVisible && (
				<div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
					<div className='bg-white p-8 rounded-lg w-96 md:w-[600px] z-60 relative'>
						<button onClick={handleClose} className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'>
							<FaTimes size={20} />
						</button>

						<div className='font-semibold text-xl mb-4 text-center'>{selectedProduct?.title || 'Select a T-Shirt'}</div>
						<div className='text-lg mb-4 text-center'>Select an application method</div>

						<div className='flex justify-between space-x-4'>
							<div
								className='flex flex-col items-center cursor-pointer w-full p-2 rounded-md'
								onClick={() => setSelectedMethod('Embroidery')}>
								<div
									className={`border-2 ${
										selectedMethod === 'Embroidery' ? 'border-orange-500' : 'border-transparent'
									} rounded-md`}>
									<img
										src={Embroidery}
										alt='Embroidery'
										className='object-cover mb-2 rounded-md'
										style={{ maxWidth: '100%', height: 'auto' }}
									/>
								</div>
								<div className='text-lg font-semibold text-center'>Embroidery</div>
								<div className='text-sm text-gray-500 text-center'>
									Embroidery involves stitching logos onto garments by needle and thread.
								</div>
								{selectedMethod === 'Embroidery' && <div className='mt-2 text-sm text-yellow-500'>We Recommend</div>}
							</div>

							<div
								className='flex flex-col items-center cursor-pointer w-full p-2 rounded-md'
								onClick={() => setSelectedMethod('Print')}>
								<div
									className={`border-2 ${
										selectedMethod === 'Print' ? 'border-orange-500' : 'border-transparent'
									} rounded-md`}>
									<img
										src={Print}
										alt='Print'
										className='object-cover mb-2 rounded-md'
										style={{ maxWidth: '100%', height: 'auto' }}
									/>
								</div>
								<div className='text-lg font-semibold text-center'>Print</div>
								<div className='text-sm text-gray-500 text-center'>
									Printing involves pressing logos onto garments using heat.
								</div>
							</div>
						</div>

						<div className='flex justify-end mt-6'>
							{/* <button onClick={handleClose} className='bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600'>
								BACK
							</button> */}
							<button
								onClick={() => {
									setShowSizePopup(true);
									console.log('Selected method:', selectedMethod, selectedPosition);
								}}
								className='bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600'>
								NEXT STEP
							</button>
						</div>
					</div>
				</div>
			)}
			{showSizePopup && (
				<SizePopup
					visible={showSizePopup}
					onClose={handleClose}
					selectedPosition={selectedPosition}
					setSelectedPosition={setSelectedPosition}
					selectedMethod={selectedMethod}
					onNext={() => {
						setShowSizePopup(false);
						setIsAddLogoPopupVisible(true);
					} }
					onBack={ () => {
						setShowSizePopup(false)
					}}
				/>
			)}
			{isAddLogoPopupVisible && (
				<AddLogoPopup
					selectedPosition={selectedPosition}
					onBack={() => {
						setIsAddLogoPopupVisible(false);
						setShowSizePopup(true);
					}}
					onNext={() => {
						setIsAddLogoPopupVisible(false);
						setIsAddTextLogoPopupVisible(true);
					}}
					onUpload={() => {
						setIsAddLogoPopupVisible(false);
						setIsUploadLogoPopupVisible(true);
					}}
					onClose={handleClose} // Add this line
				/>
			)}
			{isAddLogoPopupVisible && console.log(selectedMethod, selectedPosition, selectedColor, selectedProduct)}
			{isAddTextLogoPopupVisible && (
				<AddTextLogoPopup
					selectedProduct={selectedProduct}
					selectedSize={selectedSize}
					selectedColor={selectedColor}
					selectedPosition={selectedPosition}
					selectedMethod={selectedMethod}
					onBack={() => {
						setIsAddTextLogoPopupVisible(false);
						setIsAddLogoPopupVisible(true);
					}}
					onFinish={handleFinishTextLogo}
					onClose={handleClose}
				/>
			)}
			{isUploadLogoPopupVisible && (
				<UploadLogoPopup
					selectedProduct={selectedProduct}
					selectedSize={selectedSize}
					selectedColor={selectedColor}
					selectedPosition={selectedPosition}
					selectedMethod={selectedMethod}
					onBack={() => {
						setIsUploadLogoPopupVisible(false);
						setIsAddLogoPopupVisible(true);
					}}
					onClose={handleClose}
				/>
			)}
		</>
	);
};

Popup.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	selectedProduct: PropTypes.object,
	selectedSize: PropTypes.object,
	selectedColor: PropTypes.string,
};

export default Popup;
