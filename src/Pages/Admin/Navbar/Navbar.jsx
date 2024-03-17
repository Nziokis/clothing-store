import React from "react";
import "./Navbar.css";
import navlogo from "../../../Components/Assets/nav-logo.svg";
import navProfile from "../../../Components/Assets/nav-profile.svg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="admin-navbar">
      <Link to="/">
        <img className="admin-nav-logo" src={navlogo} alt="nav" />
      </Link>
      <img className="admin-nav-profile" src={navProfile} alt="navProfile" />
    </div>
  );
};

export default Navbar;
