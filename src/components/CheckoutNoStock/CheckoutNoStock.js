import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

const CheckoutNoStock = ({ noStock }) => {
  return (
    <div className="white-container-full">
      <h3 className="title">La orden no se pudo procesar</h3>
      <p className="title title-small">
        No hay stock de los siguientes productos:
      </p>
      {noStock.map((item) => (
        <div key={item.id} className="checkout-container-no-stock">
          <p className="title title-small">{item.name}</p>
          <img className="img-no-stock" src={item.img} alt={item.name} />
        </div>
      ))}
      <p className="title title-small">
        Por favor, regrese al carrito y actualice su compra
      </p>
      <Link to="/cart" className=" d-flex justify-content-center link">
        <CustomButton
          textButton={"Volver al carrito "}
          className={"btn-login btn-link"}
        />
      </Link>
    </div>
  );
};

export default CheckoutNoStock;