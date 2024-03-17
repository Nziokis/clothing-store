import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
const Breadcrum = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const shop = () => {
    navigate(`/${product.category}`);
  };
  return (
    <div className="breadcrum">
      Home <img src={arrow_icon} alt="breadcrum" /> <Link className="shop-breadcrumb" to="/">Shop</Link>
      <img src={arrow_icon} alt="Shop" />
      <span
        className="category-breadcrumb"
        onClick={() => {
          shop();
        }}
      >
        {product.category}
      </span>
      <img src={arrow_icon} alt="category" />
      {product.name}
    </div>
  );
};

export default Breadcrum;
