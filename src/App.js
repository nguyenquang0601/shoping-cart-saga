import React from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/filter";
import Cart from "./components/Cart";
import { useInjectReducer } from "redux-injectors";
import { sliceKey, reducer } from "./utils/reducer/productReducer";
import {
  sliceKey as cartKey,
  reducer as cartReducer,
} from "./utils/reducer/cartReducer";
const App = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectReducer({ key: cartKey, reducer: cartReducer });
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>All right is reser</footer>
    </div>
  );
};

export default App;
