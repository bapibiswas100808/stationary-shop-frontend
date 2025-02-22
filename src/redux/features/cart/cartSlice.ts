import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
  productId: "",
  price: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { quantity, productId, price } = action.payload;
      state.quantity = quantity;
      state.productId = productId;
      state.price = price;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
