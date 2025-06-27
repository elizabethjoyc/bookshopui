// src/pages/BookList.js
import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./BookList.css";


const booksData = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 5, title: "Moby Dick", author: "Herman Melville" },
  { id: 6, title: "War and Peace", author: "Leo Tolstoy" },
];

const BookList = () => {
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="book-container">
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
