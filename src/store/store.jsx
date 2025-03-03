import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import promoCodeReducer from './promoCodeSlice';
import authReducer from "./authSlice"

const store = configureStore({
	reducer: {
		cart: cartReducer,
		promoCode: promoCodeReducer,
		auth: authReducer,
	},
});

export default store;
