import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../../Components/Assets/Product_Cart.svg";
import list_product_icon from "../../../Components/Assets/Product_list_icon.svg";
import { useAuth } from "../../../Context/AuthProvider";
const Sidebar = () => {
  const auth = useAuth();
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="addproduct" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="listproduct" />
          <p>Product List</p>
        </div>
      </Link>
      <div className="sidebar-item">
        <button className="logout-btn" onClick={() => auth.logOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
