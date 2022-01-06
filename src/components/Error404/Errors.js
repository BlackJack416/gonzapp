import React from "react";
import { useHistory } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

const Error404 = () => {
  const { push } = useHistory();

  return (
    <div className="container-404 text-center my-5 d-flex row justify-content-center align-items-center">
      <h2 className="m-1 mt-5">OOPS... ERROR 404</h2>
      <h2 className="m-1">No encontramos lo que buscabas</h2>
      <CustomButton
        textButton={"Volver al inicio"}
        className={"btn-login"}
        onClick={() => push("/")}
      />
    </div>
  );
};

export default Error404;