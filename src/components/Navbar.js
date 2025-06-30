// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
      </div>

      <div className="navbar-title">
        Book Shop
      </div>

      <div className="navbar-links">
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
