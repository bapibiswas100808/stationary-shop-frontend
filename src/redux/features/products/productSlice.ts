import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  brand: "",
  price: "",
  category: "",
  description: "",
  quantity: 0,
  inStock: true,
  isDeleted: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const {
        name,
        brand,
        price,
        category,
        description,
        quantity,
        inStock,
        isDeleted,
      } = action.payload;
      state.name = name;
      state.brand = brand;
      state.price = price;
      state.category = category;
      state.description = description;
      state.quantity = quantity;
      state.inStock = inStock;
      state.isDeleted = isDeleted;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
