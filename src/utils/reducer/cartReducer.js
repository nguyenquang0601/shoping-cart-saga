import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};
const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const product = action.payload;
      const cartItems = state.cartItems.slice();
      let alreadyExists = false;
      cartItems.forEach((x) => {
        if (x._id === product._id) {
          alreadyExists = true;
          x.count++;
        }
      });
      if (!alreadyExists) {
        cartItems.push({
          ...product,
          count: 1,
        });
      }
      state.cartItems = cartItems;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    listCart(state, action) {
      state.order = null;
      state.cartItems = action.payload;
    },
    deleteProductoutCart(state, action) {
      const cartItems = state.cartItems
        .slice()
        .filter((x) => x._id !== action.payload._id);
      state.cartItems = cartItems;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
  },
});
export const { name: sliceKey, reducer, actions } = cartReducer;
