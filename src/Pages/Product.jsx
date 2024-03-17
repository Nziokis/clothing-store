import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import Navbar from "../Components/Navbar/Navbar";

import { FiCommand } from "react-icons/fi";
import "./Product.css";
const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product data from an API on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(
          `http://localhost:4000/api/product/${productId}`
        );
        const data = await response.json();
        setProduct(data); // Set the product data in the state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]); // Re-run the effect when productId changes

  if (!product) {
    return (
      <div className="center-spinner">
        <FiCommand className="loading-icon" />
      </div>
    ); // You can show a loading spinner while fetching data
  }

  return (
    <div>
      <Navbar />
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts />
    </div>
  );
};

export default Product;
