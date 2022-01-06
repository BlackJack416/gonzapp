import React from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function ItemCounter({ quantity, modifyQuantity, stock }) {
  
  //quantity y modifyQuantity estado en el ItemDetail

  const onIncrement = () => {
    if (quantity < stock && quantity >= 1) {
      modifyQuantity(quantity + 1);
    }
  };

  const onDecrement = () => {
    if (quantity > 1) {
      modifyQuantity(quantity - 1);
    }
  };

  return (
    <div className="m-1 d-flex justify-content-start align-items-center item-count-container">
      <CustomButton
        textButton={"-"}
        onClick={onDecrement}
        className={"btn-login"}
        disabled={quantity === 1}
      />

      <span>{quantity}</span>

      <CustomButton
        textButton={"+"}
        onClick={onIncrement}
        className={"btn-login"}
        disabled={quantity === stock}
      />
    </div>
  );
}