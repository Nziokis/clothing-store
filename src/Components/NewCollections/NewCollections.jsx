import React, { useEffect, useState } from "react";
import "./NewCollections.css";

import Item from "../Item/Item";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(() => {
    fetch("https://clothing-backend-zdrq.onrender.com/api/newcollections")
      .then((res) => res.json())
      .then((data) => setNew_collection(data));
  }, []);
  return (
    <div className="new-collections">
      <h1>NewCollections</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
