import React, { useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../../Components/Assets/cross_icon.png";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("https://clothing-backend-zdrq.onrender.com/api/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };
  useState(() => {
    fetchInfo();
  }, []);
  const remove_product = async (id) => {
    await fetch(
      "https://clothing-backend-zdrq.onrender.com/api/removeproduct",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );
    await fetchInfo();
  };
  return (
    <>
      <Navbar />
      <div className="admin">
        <Sidebar />
        <div className="list-product">
          <h1>All products List</h1>
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old price</p>
            <p>New price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product, index) => {
              return (
                <div>
                  <div
                    key={index}
                    className="listproduct-format-main listproduct-format"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="listproduct-product-icon"
                    />
                    <p>{product.name}</p>
                    <p>Ksh {product.old_price}</p>
                    <p>Ksh {product.new_price}</p>
                    <p>Ksh{product.category}</p>
                    <img
                      onClick={() => {
                        remove_product(product.id);
                      }}
                      className="listproduct-remove-icon"
                      src={cross_icon}
                      alt="remove product"
                    />
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
