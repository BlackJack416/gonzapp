import React from "react";
import Item from "../Item/Item";
function ItemList({ products }) {
  return (
    <>
      {products.map((product) => {
        return <Item product={product} key={product.id} />;
      })}
    </>
  );
}

export default ItemList;