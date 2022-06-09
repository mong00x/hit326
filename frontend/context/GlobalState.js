import React, { useState, useReducer } from "react";
import Context from "./context";
import { reducer, ADD_PRODUCT, REMOVE_PRODUCT } from "./reducer";
const cartFromLocalStorage = JSON.parse(
  (typeof window !== "undefined" && window.localStorage.getItem("cart")) || "[]"
);

const GlobalState = (props) => {
  const [cartState, dispatch] = useReducer(reducer, {
    cart: cartFromLocalStorage,
  });

  const addProductToCart = (product) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 100);
  };

  const removeProductFromCart = (productId) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 100);
  };

  return (
    <Context.Provider
      value={{
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalState;
