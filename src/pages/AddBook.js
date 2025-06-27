import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBook.css";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
    price: "",
    noofcopies: ""
  });

  const [bookList, setBookList] = useState([]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/stock");
      setBookList(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/stock", {
        ...book,
        year: parseInt(book.year),
        price: parseFloat(book.price),
        noofcopies: parseInt(book.noofcopies)
      });

      alert("Book added successfully!");
      setBook({ title: "", author: "", year: "", price: "", noofcopies: "" });
      fetchBooks(); // refresh book list
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  useEffect(() => {
    fetchBooks(); // fetch on component mount
  }, []);

  return (
    <div className="add-book-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
        <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
        <input name="year" type="number" value={book.year} onChange={handleChange} placeholder="Year" required />
        <input name="price" type="number" step="0.01" value={book.price} onChange={handleChange} placeholder="Price" required />
        <input name="noofcopies" type="number" value={book.noofcopies} onChange={handleChange} placeholder="Number of copies" required />
        <button type="submit">Add Book</button>
      </form>

      <h3>All Books</h3>
      {bookList.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Price</th>
              <th>noofcopies</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((b, index) => (
              <tr key={index}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>€{b.price.toFixed(2)}</td>
                <td>{b.noofcopies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddBook;
