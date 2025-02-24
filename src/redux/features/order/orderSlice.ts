import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  product: null,
  quantity: 1,
  totalPrice: 0,
  status: "pending",
  transaction: {
    id: "",
    transactionStatus: "",
    bank_status: "",
    sp_code: "",
    sp_message: "",
    method: "",
    date_time: "",
  },
  isDeleted: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      const {
        email,
        product,
        quantity,
        totalPrice,
        status,
        transaction,
        isDeleted,
      } = action.payload;
      state.email = email;
      state.product = product;
      state.totalPrice = totalPrice;
      state.status = status;
      state.transaction = transaction;
      state.quantity = quantity;
      state.isDeleted = isDeleted;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
