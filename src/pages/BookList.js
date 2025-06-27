


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookList.css";
import { CartContext } from "../context/CartContext";

function BookList({ addToCart }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/stock")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching books", err));
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-list-container">
      <h2>Available Books</h2>

      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> €{book.price.toFixed(2)}</p>
              <button onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
