import React, { useEffect, useState } from "react";
import formatCurrency from "../utils/format";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { actions, sliceKey } from "../utils/reducer/productReducer";
import { actions as actionsCart } from "../utils/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useInjectSaga } from "redux-injectors";
import productSaga from "../utils/saga/productSaga";
import cartSaga from "../utils/saga/cartSaga";
import { selectProducts } from "../utils/selector/product";
import { sliceKey as cartKey } from "../utils/reducer/cartReducer";
import { selectCarts } from "../utils/selector/cart";
// import { Zoom } from "react-toastify";
const Products = (props) => {
  const [product, setProduct] = useState();
  useInjectSaga({ key: sliceKey, saga: productSaga });
  useInjectSaga({ key: cartKey, saga: cartSaga });
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCarts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getProducts(null));
  }, []);
  const addToCart = async (product) => {
    dispatch(actionsCart.addProductToCart(product));
  };
  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct(null);
  };
  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {products?.map((ele) => (
            <li key={ele._id}>
              <div className="product">
                <a href="#" onClick={() => openModal(ele)}>
                  <img src={ele.image}></img>
                  <p>{ele.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(ele.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => addToCart(ele)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            {" "}
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="product-details">
              <img src={product.image}></img>
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>
                  <strong>{product.description}</strong>
                </p>
                <p>
                  Avaiable Sizes
                  {product.availableSizes.map((ele) => {
                    return (
                      <span>
                        {" "}
                        <button className="button">{ele}</button>
                      </span>
                    );
                  })}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addToCart(product);
                      closeModal();
                    }}
                  >
                    Add to Cart{" "}
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
