import React from "react";
import { useHistory } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";

//STYLES:
import "../../_custom.scss";

const CheckoutSuccess = ({ orderId }) => {
  const { push } = useHistory();

  return (
    <div className="violet-container">
      <h3>¡Su orden ha sido procesada exitosamente!</h3>
      <p>El código de su compra es:</p>
      <p className="codigo">{orderId}</p>
      <p className="last">¡Gracias por comprar en COMIDAS! Que tenga un lindo dia</p>

      <CustomButton
        textButton={"Volver al Inicio"}
        className="btn-login btn-container-violet"
        onClick={() => push("/")}
      />
      <CustomButton
        textButton={"Volver a comprar"}
        className="btn-login btn-container-violet"
        onClick={() => push("/nuestrosProductos")}
      />
    </div>
  );
};

export default CheckoutSuccess;