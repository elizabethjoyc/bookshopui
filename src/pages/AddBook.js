// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AddBook.css";

// function AddBook() {
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     year: "",
//     price: "",
//     noofcopies: ""
//   });

//   const [bookList, setBookList] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setBook({ ...book, [e.target.name]: e.target.value });
//   };

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/stock");
//       setBookList(response.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:8080/stock", {
//         ...book,
//         year: parseInt(book.year),
//         price: parseFloat(book.price),
//         noofcopies: parseInt(book.noofcopies)
//       });

//       alert("Book added successfully!");
//       setBook({ title: "", author: "", year: "", price: "", noofcopies: "" });
//       fetchBooks(); // refresh book list
//     } catch (error) {
//       console.error("Error adding book:", error);
//       alert("Failed to add book.");
//     }
//   };

//   const handleDelete = async (bookId) => {
//     try {
//       await axios.delete(`http://localhost:8080/stock/${bookId}`);
//       alert("Book deleted successfully!");
//       fetchBooks(); // refresh book list
//     } catch (error) {
//       console.error("Error deleting book:", error);
//       alert("Failed to delete book.");
//     }
//   };

//   const handleAddToCart = (book) => {
//     const userId = localStorage.getItem('userId');
    
//     if (!userId) {
//       // Store book and redirect to login
//       localStorage.setItem('pendingCartItem', JSON.stringify(book));
//       navigate('/login', { state: { from: '/books' } });
//       return;
//     }

//     // If logged in, add directly to cart
//     axios.post('http://localhost:8080/cart/add', {
//       userId: userId,
//       bookId: book.id
//     })
//     .then(() => alert(`${book.title} added to cart!`))
//     .catch(err => console.error("Error adding to cart:", err));
//   };

//   useEffect(() => {
//     fetchBooks(); // fetch on component mount
//   }, []);

//   return (
//     <div className="add-book-container">
//       <h2>Add Book</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
//         <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
//         <input name="year" type="number" value={book.year} onChange={handleChange} placeholder="Year" required />
//         <input name="price" type="number" step="0.01" value={book.price} onChange={handleChange} placeholder="Price" required />
//         <input name="noofcopies" type="number" value={book.noofcopies} onChange={handleChange} placeholder="Number of copies" required />
//         <button type="submit">Add Book</button>
//       </form>

//       <h3>All Books</h3>
//       {bookList.length === 0 ? (
//         <p>No books found.</p>
//       ) : (
//         <table className="book-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Year</th>
//               <th>Price</th>
//               <th>Copies</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookList.map((b, index) => (
//               <tr key={index}>
//                 <td>{b.title}</td>
//                 <td>{b.author}</td>
//                 <td>{b.year}</td>
//                 <td>€{b.price.toFixed(2)}</td>
//                 <td>{b.noofcopies}</td>
//                 <td>
//                   <button onClick={() => handleDelete(b.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AddBook;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [editingBook, setEditingBook] = useState(null);
  const [editCopies, setEditCopies] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/stock/${bookId}`);
      alert("Book deleted successfully!");
      fetchBooks(); // refresh book list
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
    setEditCopies(book.noofcopies);
  };

  const handleEditChange = (e) => {
    setEditCopies(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (!editingBook) return;

    try {
      await axios.put(`http://localhost:8080/stock/${editingBook.id}`, {
        ...editingBook,
        noofcopies: parseInt(editCopies)
      });

      alert("Book updated successfully!");
      setEditingBook(null);
      fetchBooks(); // refresh book list
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book.");
    }
  };

  const handleAddToCart = (book) => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      localStorage.setItem('pendingCartItem', JSON.stringify(book));
      navigate('/login', { state: { from: '/books' } });
      return;
    }

    axios.post('http://localhost:8080/cart/add', {
      userId: userId,
      bookId: book.id
    })
    .then(() => alert(`${book.title} added to cart!`))
    .catch(err => console.error("Error adding to cart:", err));
  };

  useEffect(() => {
    fetchBooks();
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
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>€{b.price.toFixed(2)}</td>
                <td>
                  {editingBook?.id === b.id ? (
                    <input
                      type="number"
                      value={editCopies}
                      onChange={handleEditChange}
                      min="0"
                    />
                  ) : (
                    b.noofcopies
                  )}
                </td>
                <td>
                  {editingBook?.id === b.id ? (
                    <>
                      <button onClick={handleEditSubmit}>Save</button>
                      <button onClick={() => setEditingBook(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(b)}>Edit</button>
                      <button onClick={() => handleDelete(b.id)}>Delete</button>
                  
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddBook;