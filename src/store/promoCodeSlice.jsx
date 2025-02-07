// store/promoCodeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const promoCodes = {
  SAVE10: 10,
  SAVE20: 20,
};

const initialState = {
  code: "",
  discount: 0,
};

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    applyPromoCode(state, action) {
      const { code } = action.payload;
      const discount = promoCodes[code] || 0;
      state.code = code;
      state.discount = discount;
    },
    clearPromoCode(state) {
      state.code = "";
      state.discount = 0;
    },
  },
});

export const { applyPromoCode, clearPromoCode } = promoCodeSlice.actions;
export default promoCodeSlice.reducer;
