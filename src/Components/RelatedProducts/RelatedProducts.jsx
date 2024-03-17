import React, { useState } from "react";
import "./RelatedProducts.css";

import Item from "../Item/Item";
const RelatedProducts = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/api/allproducts")
      .then((res) => res.json())
      .then((data) => {
        const subsetOfData = data.slice(0, 4);
        setAllProducts(subsetOfData);
      });
  };
  useState(() => {
    fetchInfo();
  }, []);

  return (
    <div className="relatedproducts">
      <h1>RelatedProducts</h1>
      <hr />
      <div className="relatedproducts-item">
        {allproducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
