import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/stock")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching books", err));
  }, []);

  const handleAddToCart = async (book) => {
  try {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');
    
    if (!userId || !authToken) {
      localStorage.setItem('pendingCartItem', JSON.stringify(book));
      navigate('/login', { 
        state: { from: window.location.pathname } 
      });
      return;
    }

    // Verify token is still valid
    const response = await axios.post('http://localhost:8080/cart/add', {
      userId,
      bookId: book.id
    }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    alert(`${book.title} added to cart!`);

  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired - clear storage and redirect to login
      localStorage.removeItem('userId');
      localStorage.removeItem('authToken');
      localStorage.setItem('pendingCartItem', JSON.stringify(book));
      navigate('/login');
    } else {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  }
  };


  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
  (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <button onClick={() => handleAddToCart(book)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;