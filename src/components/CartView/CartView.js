import React, { useContext } from "react";
import CartItem from "../CartItem/CartItem";
import CustomButton from "../CustomButton/CustomButton";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

//CONTEXT:
import { CartContext } from "../../context/CartContext";

const CartView = () => {
  const { carrito, totalPurchase, emptyCart } = useContext(CartContext);
  const { push } = useHistory();

  return (
    <div className={carrito.length === 0 ? "violet-container" : "white-container-full"}>
      {carrito.length === 0 ? (
        <>
          <h3>
            EL CARRITO DE COMPRAS ESTÁ VACÍO
          </h3>

          <CustomButton
            textButton={"Ir a Comprar"}
            onClick={() => push("/nuestrosProductos")}
            className={"btn-login"}
          />
        </>
      ) : (
        <>
          <h2 className="cart-view-title">RESUMEN DE COMPRA</h2>

          {carrito.map((productos) => (
            <CartItem {...productos} key={productos.id} />
          ))}

          <h3 className="cart-view-total">Total: $ {totalPurchase()}</h3>

          <CustomButton
            textButton={"Vaciar Carrito"}
            onClick={() => emptyCart()}
            className={"btn-login"}
          />

          <Link to="/nuestrosProductos">
            <CustomButton
              textButton={"Seguir Comprando"}
              className={"btn-login"}
            />
          </Link>

          <CustomButton
            textButton={"Finalizar Compra"}
            onClick={() => push("/checkout")}
            className={"btn-login"}
          />
        </>
      )}
    </div>
  );
};

export default CartView;