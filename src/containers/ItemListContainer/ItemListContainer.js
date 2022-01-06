import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../../components/ItemList/ItemList";
import Loader from "../../components/Loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../../firebase/config";

function ItemListContainer(props) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();
  console.log(categoryId);

  useEffect(() => {
    setLoading(true);

    //1- REFERENCE:
    const productosRef = collection(db, "products");
    const q = categoryId
      ? query(productosRef, where("category", "==", categoryId))
      : productosRef;

    //2- PETITION:
    getDocs(q)
      .then((response) => {
        const items = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return loading ? (
    <Loader textLoader={"Cargando..."} />
  ) : (
    <div className="d-flex row wrap align-items-center justify-content-center container-item-list">
      <ItemList products={products} />
    </div>
  );
}

export default ItemListContainer;