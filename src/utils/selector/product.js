import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../reducer/productReducer";
const selectElement = (state) => {
  return state?.productReducer || initialState;
};
export const selectProducts = createSelector(
  [selectElement],
  ({ ...productReducer }) => {
    return productReducer?.products;
  }
);
export const selectItems = createSelector(
  [selectElement],
  ({ ...productReducer }) => {
    return productReducer?.items;
  }
);
export const selectSort = createSelector(
  [selectElement],
  ({ ...productReducer }) => {
    return productReducer?.sort;
  }
);
export const selectbySize = createSelector(
  [selectElement],
  ({ ...productReducer }) => {
    return productReducer?.size;
  }
);
