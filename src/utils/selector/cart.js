import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../reducer/cartReducer";
const selectElement = (state) => {
  return state?.cartReducer || initialState;
};
export const selectCarts = createSelector(
  [selectElement],
  ({ ...cartReducer }) => {
    return cartReducer?.cartItems;
  }
);
export const selectOrder = createSelector(
  [selectElement],
  ({ ...cartReducer }) => {
    return cartReducer?.order;
  }
);
