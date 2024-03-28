import React, { useState } from "react";
import "./AddProduct.css";
import Sidebar from "../Sidebar/Sidebar";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "", // Change to accept image URL
    category: "",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Add validation logic here
    if (
      !productDetails.name ||
      !productDetails.new_price ||
      !productDetails.category ||
      !productDetails.image // Add validation for image URL
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });

      return false;
    }
    return true;
  };

  const Add_Product = async () => {
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    console.log(productDetails);

    try {
      const response = await fetch(
        "https://clothing-backend-zdrq.onrender.com/api/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        }
      );

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully added",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error state or alert the user
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add. Please try again later.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin">
        <Sidebar />
        <div className="add-product">
          <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input
              value={productDetails.name}
              onChange={changeHandler}
              type="text"
              name="name"
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                value={productDetails.old_price}
                onChange={changeHandler}
                type="text"
                name="old_price"
                placeholder="Type here"
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                value={productDetails.new_price}
                onChange={changeHandler}
                type="text"
                name="new_price"
                placeholder="Type here"
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product category</p>
            <select
              value={productDetails.category}
              onChange={changeHandler}
              name="category"
              className="add-product-selector"
            >
              <option value={null}>all</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <p>Image URL</p>
            <input
              value={productDetails.image}
              onChange={changeHandler}
              type="text"
              name="image"
              placeholder="Enter image URL"
            />
          </div>
        </div>
        <button onClick={Add_Product} className="addproduct-btn">
          ADD
        </button>
      </div>
    </>
  );
};

export default AddProduct;
