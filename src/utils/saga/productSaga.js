import { takeLatest, put, select } from "redux-saga/effects";
import { actions } from "../reducer/productReducer";
import { selectbySize, selectItems, selectSort } from "../selector/product";
export function* getDataProduct() {
  const res = yield fetch("/api/products").then((res) => res.json());
  yield put(actions.getListProducts(res));
}
export function* sortProduct() {
  const items = yield select(selectItems);
  const sort = yield select(selectSort);
  const arr = yield items
    .slice()
    .sort((a, b) =>
      sort === "lowest"
        ? a.price < b.price
          ? 1
          : -1
        : sort === "highest"
        ? a.price > b.price
          ? 1
          : -1
        : a._id < b._id
        ? 1
        : -1
    );
  yield put(actions.setListProduct(arr));
}
export function* filterbysize() {
  const items = yield select(selectItems);
  const size = yield select(selectbySize);
  const arr =
    size === ""
      ? yield items.slice()
      : yield items.slice().filter((x) => x.availableSizes.indexOf(size) > 0);
  yield put(actions.setListProduct(arr));
}
export default function* productSaga() {
  yield takeLatest(actions.getProducts, getDataProduct);
  yield takeLatest(actions.filterbysort, sortProduct);
  yield takeLatest(actions.filterbysize, filterbysize);
}
