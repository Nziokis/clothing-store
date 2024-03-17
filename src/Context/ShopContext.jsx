import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_products] = useState([]);
  const getDefaultCart = () => {
    let cart = {};

    for (let index = 0; index < all_product.length + 1; index++) {
      cart[index] = 0;
    }
    return cart;
  };
  const [cartItems, setCartItems] = useState(getDefaultCart);

  const addToCart = async (itemId) => {
    try {
      const response = await fetch("http://localhost:4000/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: itemId,
          quantity: 1, // You can adjust the quantity as needed
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Item added to cart successfully");
        // You can perform additional actions here after adding the item to the cart
      } else {
        throw new Error(data.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_products(data));
  }, []);
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
