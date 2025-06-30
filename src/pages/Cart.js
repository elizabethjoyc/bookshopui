import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:8080/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const items = Array.isArray(response.data) ? response.data : [];
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // const removeFromCart = async (bookId) => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     const token = localStorage.getItem('authToken');
      
  //     await axios.delete('http://localhost:8080/cart/remove', {
  //       data: { userId, bookId },
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setCartItems(cartItems.filter(item => item.bookId !== bookId));
  //   } catch (error) {
  //     console.error("Error removing item", error);
  //   }
  // };

  const removeFromCart = async (bookId) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  try {
    await axios.delete('http://localhost:8080/cart/remove', {
      data: { userId, bookId },
      headers: { Authorization: `Bearer ${token}` }
    });

    // Optimistic UI update
    setCartItems(prevItems => prevItems.filter(item => item.bookId !== bookId));

  } catch (error) {
    console.error("Error removing item", error);

    if (error.response && error.response.status === 400) {
      // Refresh the cart if there was an error
      try {
        const response = await axios.get(`http://localhost:8080/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(response.data);
        alert("Item removed successfully, but there were duplicates that have been cleaned up.");
      } catch (refreshError) {
        console.error("Failed to refresh cart:", refreshError);
        alert("Failed to remove item and refresh cart.");
      }
    } else {
      alert("Failed to remove item. Please try again.");
    }
  }
};


  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const creditCard = prompt("Enter your credit card number:");

    if (!creditCard) {
      alert("Checkout cancelled.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/cart/checkout', {
        userId,
        cardNumber: creditCard
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200) {
        setCheckoutSuccess(true);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Checkout failed. Please try again.");
    }
  };

  if (loading) return <div>Loading cart...</div>;

  if (checkoutSuccess) {
    return (
      <div className="cart-container">
        <h2>Order Confirmation</h2>
        <div className="success-message">
          <p>Payment successful! Your order has been placed.</p>
          <button onClick={() => {
            setCheckoutSuccess(false);
            navigate('/');
          }} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 && !checkoutSuccess ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.bookId || item.id} className="cart-item">
                <div>
                  <h3>{item.title || item.bookTitle}</h3>
                  <p>Author: {item.author}</p>
                  <p>Price: €{item.price?.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.bookId || item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>
              Total: €
              {cartItems
                .reduce((sum, item) => sum + (item.price || 0), 0)
                .toFixed(2)}
            </h3>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;