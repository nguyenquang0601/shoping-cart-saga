import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectSaga } from "redux-injectors";
import { actions, sliceKey } from "../utils/reducer/productReducer";
import productSaga from "../utils/saga/productSaga";
import { selectItems } from "../utils/selector/product";
const Filter = (props) => {
  useInjectSaga({ key: sliceKey, saga: productSaga });
  const items = useSelector(selectItems);
  console.log(items);
  const dispatch = useDispatch();
  return (
    <div className="filter">
      <div className="filter-result">
        {props.filteredProducts?.length} Products
      </div>
      <div className="filter-sort">
        {" "}
        Order{" "}
        <select
          value={props.sort}
          onChange={(e) => dispatch(actions.filterbysort(e.target.value))}
        >
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter
        <select
          value={props.size}
          onChange={(e) => dispatch(actions.filterbysize(e.target.value))}
        >
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="X">X</option>
          <option value="M">M</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
