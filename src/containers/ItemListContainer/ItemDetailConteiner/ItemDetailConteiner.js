import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Loader from "../../components/Loader/Loader";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../firebase/config";

const ItemDetailContainer = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    setLoading(true);

    //1- REFERENCE:
    const docRef = doc(db, "products", id);

    //2- PETITION:
    getDoc(docRef)
      .then((doc) => {
        setProductDetail({
          id: doc.id,
          ...doc.data(),
        });

        console.log("detalle producto por id", doc);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return loading ? (
    <Loader textLoader={"Cargando..."} />
  ) : (
    <div className="item-detail-container d-flex justify-content-center">
      <ItemDetail {...productDetail} />
    </div>
  );
};

export default ItemDetailContainer;