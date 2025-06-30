import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css'; // styling

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear any old auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');

      // Call backend login
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email: credentials.email,
        password: credentials.password
      });

      const token = response.data.token;
      const userId = response.data.userId;

      // Save token and userId
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);

      // Add any pending cart item saved before login
    const pendingItem = localStorage.getItem('pendingCartItem');

if (pendingItem) {
  try {
    const book = JSON.parse(pendingItem); // ✅ book is defined here
    console.log("Parsed book from localStorage:", book);

    await axios.post('http://localhost:8080/cart/add', {
      bookId: book.id,
      userId: userId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("✅ Successfully added to cart:", book.title);
    alert(`${book.title} has been added to your cart.`);
  } catch (cartError) {
    console.error("❌ Error adding pending item to cart:", cartError);
  } 
  // finally {
  //   localStorage.removeItem('pendingCartItem');
  // }
}

navigate('/cart');
      // Navigate to the original page or fallback to /cart
      const from =  '/cart';
      navigate(from);

    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        form: error.response?.data?.message || "Login failed. Please try again."
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errors.form && <div className="error-message">{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
