import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclussive_offer.png";
import { useNavigate } from "react-router-dom";
const Offers = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/men");
  };
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>Only on best sellers Products</p>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Check now
        </button>
      </div>
      <div className="offers-right">
        <img className="offer-img" src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
