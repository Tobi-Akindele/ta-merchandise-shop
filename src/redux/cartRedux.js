import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      state.isFetching = false;
      state.quantity -= 1;
      state.products.splice(
        state.products.findIndex((item) => item.id === action.payload),
        1
      );
      const remainingBalance = state.products.reduce(
        (a, b) => a.price * a.quantity + a.price * a.quantity,
        0
      );
      state.total = remainingBalance;
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
