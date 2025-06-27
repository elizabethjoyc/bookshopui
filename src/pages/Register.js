import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    dob: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users", user);
      console.log("User registered:", response.data);
      alert("Registration successful!");
      setUser({ name: "", surname: "", dob: "", address: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name} onChange={handleChange} placeholder="First Name" required />
        <input name="surname" value={user.surname} onChange={handleChange} placeholder="Surname" required />
        <input name="dob" type="date" value={user.dob} onChange={handleChange} required />
        <input name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
        <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="email" value={user.email} onChange={handleChange} placeholder="Email" type="email" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
