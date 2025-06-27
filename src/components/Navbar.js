// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true); // Replace with real auth logic

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/admin">Admin</Link>
      {loggedIn && <Link to="/cart">Cart</Link>}
    </nav>
  );
}

export default Navbar;
