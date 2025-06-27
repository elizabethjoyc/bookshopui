import React, { useState } from "react";

function AddBook() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Example Book",
      author: "John Doe",
      year: 2020,
      price: 19.99,
      copies: 5,
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    price: "",
    copies: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // Edit existing book
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === editId ? { ...form, id: editId, year: Number(form.year), price: Number(form.price), copies: Number(form.copies) } : b
        )
      );
      setEditId(null);
    } else {
      // Add new book
      const newBook = {
        ...form,
        id: Date.now(),
        year: Number(form.year),
        price: Number(form.price),
        copies: Number(form.copies),
      };
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }

    // Reset form
    setForm({
      title: "",
      author: "",
      year: "",
      price: "",
      copies: "",
    });
  };

  const handleEdit = (id) => {
    const bookToEdit = books.find((b) => b.id === id);
    setForm({
      title: bookToEdit.title,
      author: bookToEdit.author,
      year: bookToEdit.year,
      price: bookToEdit.price,
      copies: bookToEdit.copies,
    });
    setEditId(id);
  };

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ title: "", author: "", year: "", price: "", copies: "" });
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>
      <h2>{editId ? "Edit Book" : "Add New Book"}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
          min="0"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          min="0"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="copies"
          placeholder="Number of Copies"
          value={form.copies}
          onChange={handleChange}
          required
          min="0"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 15px" }}>
          {editId ? "Update Book" : "Add Book"}
        </button>
      </form>

      <h3>Books List</h3>
      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Price</th>
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>${b.price.toFixed(2)}</td>
                <td>{b.copies}</td>
                <td>
                  <button onClick={() => handleEdit(b.id)} style={{ marginRight: "10px" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
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
