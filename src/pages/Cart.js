// src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((book) => (
              <li key={book.id}>
                <span>{book.title} - €{book.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(book.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: €{totalPrice.toFixed(2)}</h3>
          <button className="checkout-btn">Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
