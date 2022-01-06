import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import LastItemInStock from "../LastItemInStock/LastItemInStock";
import NoStock from "../NoStock/NoStock";

const Item = ({ product }) => {
  return (
    <Card className="card-container m-2">
      <Card.Img variant="top" src={product.img} className="card-img" />
      <Card.Body>
        {product.noTacc && (
          <h5 className="product-option d-flex align-items-center text-center">
            SIN TACC
          </h5>
        )}
        {product.vegan && (
          <h5 className="product-option d-flex align-items-center text-center">
            VEGAN
          </h5>
        )}

        <Card.Title>{product.name}</Card.Title>

        <Card.Text>Presentación: {product.presentation}</Card.Text>
        {product.stock === 0 ? (
          <NoStock/>
        ) : (
            <>
            <Card.Text>Stock disponible {product.stock}</Card.Text>
            {product.stock === 1 && <LastItemInStock/>}
            </> 
        )}
      </Card.Body>
      <Link
        to={`/item/${product.id}`}
        className="link-btn-detail d-flex justity-content-center"
      >
        <CustomButton
          textButton={"Ver Detalle"}
          className="btn-login btn-link"
        />
      </Link>
    </Card>

    //</div>
  );
};

export default Item;