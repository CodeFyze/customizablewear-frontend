import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import promoCodeReducer from './promoCodeSlice';
import authReducer from "./authSlice"
import orderReducer from "./orderSlice"

const store = configureStore({
	reducer: {
		cart: cartReducer,
		promoCode: promoCodeReducer,
		auth: authReducer,
		order: orderReducer,
	},
});

export default store;
