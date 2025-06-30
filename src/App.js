// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import BookList from "./pages/BookList";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AddBook from "./pages/AddBook";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} /> 
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
