import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action) => {
			console.log('✅ Cart data in Redux (Final Check):', action.payload);
			state.items = action.payload; // Set the cart items from the API response
		},

		addItem: (state, action) => {
			const { _id: productId, size, color, method,logo, frontImage,position, textLine, font, notes, quantity } = action.payload;

console.log(logo)
			const existingItem = state.items.find(
				(item) =>
					item.productId === productId &&
					item.size === size &&
					item.color === color &&
					item.method === method &&
					item.position === position,
			);

			if (existingItem) {
				// Increase quantity if the same product exists
				existingItem.quantity += quantity || 1;
			} else {
				// Add new item to the cart
				state.items.push({
					...action.payload,
					textLine: textLine || '', // ✅ Ensure these fields are stored
					font: font || '',
					notes: notes || '',
					quantity: quantity || 1,
				});
			}
			// console.log('state.items---->', JSON.stringify(state.items, null, 2));
		},

		removeItem: (state, action) => {
			state.items = state.items.filter((item) => item.productId !== action.payload);
		},
		increaseQuantity: (state, action) => {
			state.items = state.items.map((item) =>
				item.product?._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
			);
		},
		decreaseQuantity: (state, action) => {
			const item = state.items.find((item) => item.productId === action.payload);
			if (item && item.quantity > 1) item.quantity -= 1;
		},
	},
});

export const { setCart, addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
