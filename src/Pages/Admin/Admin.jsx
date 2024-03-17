import React from "react";
import "./Admin.css";
import Navbar from "./Navbar/Navbar";


import Sidebar from "./Sidebar/Sidebar";
const Admin = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="admin"></div>
    </>
  );
};

export default Admin;
