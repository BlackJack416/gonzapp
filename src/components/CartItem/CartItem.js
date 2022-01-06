import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//CONTEXT:
import { CartContext } from "../../context/CartContext";

const CartItem = ({ id, name, img, presentation, quantity, price, stock}) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item-container">
      
      <img className="cart-item-img" src={img} alt={`foto-${name}`} />

      <div className="cart-item-container-details">
        <h3 className="cart-item cart-item-strong mx-2">{name}</h3>
        <h3 className="cart-item mx-2">Presentación: {presentation}</h3>
        <h3 className="cart-item mx-2">Precio: $ {price}</h3>
        <h3 className="cart-item mx-2">Cantidad: {quantity}</h3>
        <FontAwesomeIcon
          onClick={() => removeFromCart(id)}
          className="trash-product"
          icon={faTrashAlt}
        />
      </div>

    </div>
  );
};

export default CartItem;