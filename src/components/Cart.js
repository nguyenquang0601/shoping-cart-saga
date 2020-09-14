import React, { Component } from "react";
import formatCurrency from "../utils/format";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { selectCarts } from "../utils/selector/cart";
import { useInjectSaga } from "redux-injectors";
import { actions, sliceKey } from "../utils/reducer/cartReducer";
import cartSaga from "../utils/saga/cartSaga";
const Cart = (props) => {
  useInjectSaga({ key: sliceKey, saga: cartSaga });
  const cartItems = useSelector(selectCarts);
  const dispatch = useDispatch();
  const order = null;
  return (
    <div>
      {cartItems?.length === 0 ? (
        <div className="cart cart-header">Cart Item empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the Cart{" "}
        </div>
      )}
      {/* {order && (
        <Modal isOpen={true} onRequestClose={closeMoal}>
          <Zoom>
            <button className="close-modal" onClick={closeMoal}>
              x
            </button>
            <div className="order-details">
              <h3 className="success-message">Your order has been placed</h3>
              <h2>Order {order._id}</h2>
              <ul>
                <li>
                  <div>Name: </div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email: </div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address: </div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Total: </div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>Cart Items: </div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div>
                        {x.count} {"X"} {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )} */}
      <div>
        <div className="cart">
          <Fade left cascache>
            <ul className="cart-items">
              {cartItems.map((ele) => (
                <li key={ele._id}>
                  <div>
                    <img src={ele.image} alt={ele.title} />
                  </div>
                  <div>
                    <div>{ele.title}</div>
                    <div className="right">
                      {formatCurrency(ele.price)} x {ele.count}{" "}
                      <button
                        className="button"
                        onClick={() =>
                          dispatch(actions.deleteProductoutCart(ele))
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total :{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  // onClick={() => {
                  //   setState({ showCheckout: true });
                  // }}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {/* {state.showCheckout ? (
              <Fade right cascache>
                <div className="cart">
                  <form onSubmit={(e) => {}}>
                    <ul className="form-container">
                      <li>
                        <label>Email: </label>
                        <input
                          type="email"
                          required
                          ref={emailRef}
                        ></input>
                      </li>
                      <li>
                        <label>Name: </label>
                        <input type="text" required ref={nameRef}></input>
                      </li>
                      <li>
                        <label>Address: </label>
                        <input
                          type="text"
                          required
                          ref={addressRef}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            ) : (
              ""
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
