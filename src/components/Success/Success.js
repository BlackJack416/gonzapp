import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useHistory } from "react-router";

const Success = ({ message }) => {
  const { push } = useHistory();

  return (
    <div className="success-container my-5">
      <h2>{message}</h2>
      <CustomButton textButton={"Volver al inicio"} onClick={() => push("/")} />
    </div>
  );
};

export default Success;