import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = (props) => {
  const { getTotalCartAmount, cartItems, removeFromCart } =
    useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState([]);
  async function getMatchingItems(cartItems) {
    const matchingItems = [];
    try {
      const response = await fetch(`http://localhost:4000/api/newcollections`);
      const newCollections = await response.json();
      for (const item of cartItems) {
        const matchingItem = newCollections.find(
          (collection) => collection.id === item.product_id
        );
        if (matchingItem) {
          matchingItems.push(matchingItem);
        }
      }
    } catch (error) {
      console.error("Error fetching matching items:", error);
    }
    return matchingItems;
  }

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await fetch("http://localhost:4000/api/cartitems");
        const data = await response.json();
        if (data.success) {
          setCartProducts(data.cartItems);
        } else {
          throw new Error(data.error || "Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    }
    fetchCartItems();
  }, []);

  useEffect(() => {
    getMatchingItems(cartProducts)
      .then((matchingItems) => {
        console.log("Matching items:", matchingItems);
        setCart(matchingItems);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [cartProducts]);

  console.log(cart);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        {/* <p>Quantity</p>
        <p>Total</p> */}
        <p>Remove</p>
      </div>
      <hr />

      {cart?.map((e) => {
        return (
          <div>
            <div className="cartitems-format cartitems-format-main">
              <img className="carticon-product-icon" src={e.image} alt="" />
              <p>{e.name}</p>
              <p>Ksh {e.new_price}</p>
              {/* <button className="cartitems-quantity">{cartItems[e.id]}</button> */}

              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => {
                  removeFromCart(e.id);
                }}
                alt=""
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            {/* <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Ksh {getTotalCartAmount(cartItems)}</p>
            </div> */}
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            {/* <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Ksh {getTotalCartAmount()}</h3>
            </div> */}
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>if you have promocode ,enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
