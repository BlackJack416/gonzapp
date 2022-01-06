import React, { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

const initialCart = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(initialCart);

  //ADD ITEM
  const addToCart = (item) => {
    setCarrito([...carrito, item]);
  };

  //REMOVE ITEM
  const removeFromCart = (id) => {
    setCarrito(carrito.filter((buscarProducto) => buscarProducto.id !== id));
  };

  //IS IN CART?
  const productInCart = (id) => {
    return carrito.some((buscaProducto) => buscaProducto.id === id);
  };

  //CLEAR
  const emptyCart = () => {
    setCarrito([]);
  };

  //TOTAL QUANTITY IN CART
  const totalQuantity = () => {
    return Number(
      carrito.reduce(
        (acumulador, producto) => acumulador + producto.quantity,
        0
      )
    );
  };

  //TOTAL PURCHASE
  const totalPurchase = () => {
    return Number(
      carrito.reduce(
        (acumulador, producto) =>
          acumulador + producto.price * producto.quantity,
        0
      )
    );
  };

  //LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        productInCart,
        removeFromCart,
        emptyCart,
        totalQuantity,
        totalPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};