import { takeLatest, put, select } from "redux-saga/effects";
import { actions } from "../reducer/cartReducer";
import { selectCarts, selectOrder } from "../selector/cart";
export function* getCarts() {
  const cartItems = yield select(selectCarts);
  const order = yield select(selectOrder);

  let alreadyExists = false;
  yield cartItems.forEach((x) => {
    if (x._id === order._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    console.log(order);
    console.log(cartItems);
    yield cartItems.push({
      order,
      count: 1,
    });
  }
  yield put(actions.listCart(cartItems));
}
export default function* cartSaga() {
//   yield takeLatest(actions.addProduct, getCarts);
}
