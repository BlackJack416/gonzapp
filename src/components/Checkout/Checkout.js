import React, { useContext, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
  writeBatch,
  documentId,
} from "@firebase/firestore/lite";
import Loader from "../../components/Loader/Loader";
import { Link, Redirect } from "react-router-dom";
import CheckoutSuccess from "../CheckoutSuccess/CheckoutSuccess";
import CheckoutNoStock from "../CheckoutNoStock/CheckoutNoStock";
import CheckoutDetail from "../CheckoutDetail/CheckoutDetail";

//CONTEXT:
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

//FORMIK AND YUP:
import { Formik } from "formik";
import * as Yup from "yup";

const Checkout = () => {
  const { carrito, totalPurchase, emptyCart } = useContext(CartContext);
  const { user, logged } = useContext(AuthContext);

  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [noStock, setNoStock] = useState("");

  let order = {};

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    checkEmail: "",
    phone: "",
  };

  const initialValuesLogged = {
    name: "",
    surname: "",
    email: "",
    phone: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schemaNoLogged = Yup.object().shape({
    name: Yup.string()
      .required("Este campo es obligatorio")
      .min(3, "El nombre debe contener al menos 3 caracteres")
      .max(30, "El nombre es demasiado largo"),
    surname: Yup.string()
      .required("Este campo es obligatorio")
      .min(3, "El apellido debe contener al menos 3 caracteres")
      .max(30, "El apellido es demasiado largo"),
    email: Yup.string()
      .required("Este campo es obligatorio")
      .email("Email inválido"),
    checkEmail: Yup.string()
      .required("Este campo es obligatorio")
      .matches(initialValues.email, "El email no coincide con el ingresado"),
    phone: Yup.string().matches(phoneRegExp, "El número no es válido"),
  });

  const schemaLogged = Yup.object().shape({
    name: Yup.string()
      .required("Este campo es obligatorio")
      .min(3, "El nombre debe contener al menos 3 caracteres")
      .max(30, "El nombre es demasiado largo"),
    surname: Yup.string()
      .required("Este campo es obligatorio")
      .min(3, "El apellido debe contener al menos 3 caracteres")
      .max(30, "El apellido es demasiado largo"),
    email: Yup.string()
      .required("Este campo es obligatorio")
      .email("Email inválido"),
    phone: Yup.string().matches(phoneRegExp, "El número no es válido"),
  });

  const handleSubmit = (values) => {
    order = {
      buyer: values,
      items: carrito,
      total: totalPurchase(),
      date: Timestamp.fromDate(new Date()), //Timestamp Firebase
    };

    const batch = writeBatch(db);
    const ordersRef = collection(db, "orders");
    const productsRef = collection(db, "products");
    //Query para Busqueda getDocs:
    const q = query(
      productsRef,
      where(
        documentId(),
        "in",
        carrito.map((elemento) => elemento.id)
      )
    );

    //PRODUCTOS SIN STOCK:
    const outOfStock = [];

    setLoading(true);

    //BUSQUEDA
    getDocs(q).then((res) => {
      res.docs.forEach((doc) => {
        const itemInCart = carrito.find((prod) => prod.id === doc.id);

        if (doc.data().stock >= itemInCart.quantity) {
          batch.update(doc.ref, {
            stock: doc.data().stock - itemInCart.quantity,
          }); //RESTA AL STOCK LA CANTIDAD DEL CARRITO
        } else {
          outOfStock.push(itemInCart); //SI NO HAY STOCK DEL PRODUCTO
        }
      });

      //COMMIT ACTUALIZACION DE STOCK SI EL ARRAY DE NO STOCK ESTA VACIO Y EL CARRITO CONTIENE PRODUCTOS
      if (outOfStock.length === 0) {
        addDoc(ordersRef, order).then((res) => {
          batch.commit();
          setOrderId(res.id); //CODIGO DE COMPRA!
          emptyCart();
          setLoading(false);
        });
      } else {
        setNoStock(outOfStock);
        setLoading(false);
      }
    });
  };

  if (carrito.length === 0 && !orderId) {
    return <Redirect to={"/"} />;
  }

  if (loading) {
    return <Loader textLoader={ "Generando código de compra"}/>;
  }

  return (
    <>
      {orderId ? (
        <CheckoutSuccess orderId={orderId} />
      ) : noStock ? (
        <CheckoutNoStock noStock={noStock} />
      ) : (
        <div className="white-container-full">
          <h2 className="title">Checkout</h2>

          {logged && (
            <div className="container-user-logged">
              <p className="form-message form-message-logged">
                Estás comprando como: {user.email}
              </p>
            </div>
          )}
          <CheckoutDetail orderId={orderId} />
          <h2 className=" title title-small">
            Completa tus datos para terminar tu compra:
          </h2>
          <Formik
            initialValues={logged ? initialValuesLogged : initialValues}
            validationSchema={logged ? schemaLogged : schemaNoLogged}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="form">
                <input
                  className="form-input"
                  type="text"
                  value={formik.values.name}
                  name="name"
                  placeholder="Nombre"
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="form-message form-message-error">
                    {formik.errors.name}
                  </p>
                )}
                <input
                  className="form-input"
                  type="text"
                  value={formik.values.surname}
                  name="surname"
                  placeholder="Apellido"
                  onChange={formik.handleChange}
                />
                {formik.errors.surname && formik.touched.surname && (
                  <p className="form-message form-message-error">
                    {formik.errors.surname}
                  </p>
                )}
                <input
                  className="form-input"
                  type="phone"
                  value={formik.values.phone}
                  name="phone"
                  placeholder="Teléfono"
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="form-message form-message-error">
                    {formik.errors.phone}
                  </p>
                )}

                {logged ? (
                  <>
                    <input
                      className="form-input"
                      type="email"
                      value={formik.values.email}
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="form-message form-message-error">
                        {formik.errors.email}
                      </p>
                    )}

                    {formik.touched.email &&
                      formik.values.email !== user.email && (
                        <>
                          <p className="form-message form-message-error">
                            La dirección de correo no coincide.
                          </p>
                          <p className="form-message form-message-logged">
                            Si desea realizar la compra con otro email debe
                            cerrar la sesión
                          </p>
                        </>
                      )}

                    <input
                      type="submit"
                      className="btn-login"
                      value="Confirmar compra"
                      disabled={formik.values.email !== user.email}
                    />
                  </>
                ) : (
                  <>
                    <input
                      className="form-input"
                      type="email"
                      value={formik.values.email}
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="form-message form-message-error">
                        {formik.errors.email}
                      </p>
                    )}

                    <input
                      className="form-input"
                      type="email"
                      value={formik.values.checkEmail}
                      name="checkEmail"
                      placeholder="Confirmar Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.checkEmail && formik.touched.checkEmail && (
                      <p className="form-message form-message-error">
                        {formik.errors.checkEmail}
                      </p>
                    )}
                    {formik.values.email !== formik.values.checkEmail ? (
                      <p className="form-message form-message-error">
                        La direccion de correo no coincide
                      </p>
                    ) : (
                      <input
                        type="submit"
                        value="Confirmar compra"
                        className="btn-login"
                        disabled={
                          formik.values.email !== formik.values.checkEmail
                        }
                      />
                    )}
                  </>
                )}

                <Link className="btn-login btn-link" to={"/cart"}>
                  Volver al carrito
                </Link>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Checkout;