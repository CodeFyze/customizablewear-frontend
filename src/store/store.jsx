import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import promoCodeReducer from './promoCodeSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    promoCode: promoCodeReducer,
  },
});

export default store;
