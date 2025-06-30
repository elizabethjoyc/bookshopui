// import React, { useState } from "react";
// import axios from "axios";
// import "./Register.css";

// function Register() {
//   const [user, setUser] = useState({
//     name: "",
//     surname: "",
//     dob: "",
//     address: "",
//     phone: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/users", user);
//       console.log("User registered:", response.data);
//       alert("Registration successful!");
//       setUser({ name: "", surname: "", dob: "", address: "", phone: "", email: "" });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       alert("Registration failed.");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>User Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" value={user.name} onChange={handleChange} placeholder="First Name" required />
//         <input name="surname" value={user.surname} onChange={handleChange} placeholder="Surname" required />
//         <input name="dob" type="date" value={user.dob} onChange={handleChange} required />
//         <input name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
//         <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
//         <input name="email" value={user.email} onChange={handleChange} placeholder="Email" type="email" required />
//         <input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;


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
    email: "",
    password: ""
  });
const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: null});
    }
  };

  const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/users/check-email?email=${encodeURIComponent(email)}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setErrors({...errors, email: "Invalid email format"});
      return;
    }

    // Check if email exists
    const emailExists = await checkEmailExists(user.email);
    if (emailExists) {
      setErrors({...errors, email: "Email already registered"});
      return;
    }

    try {
      const userData = {
        ...user,
        dob: new Date(user.dob).toISOString(),
        phone: user.phone.toString()
      };

      const response = await axios.post("http://localhost:8080/api/users/register", userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("User registered:", response.data);
      alert("Registration successful!");
      setUser({ 
        name: "", 
        surname: "", 
        dob: "", 
        address: "", 
        phone: "", 
        email: "", 
        password: "" 
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          // Validation errors from backend
          setErrors(error.response.data);
        } else {
          alert(error.response.data.message || "Registration failed");
        }
      } else {
        alert("Registration failed: Could not connect to server");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name} onChange={handleChange} placeholder="First Name" required />
        {errors.name && <span className="error">{errors.name}</span>}
        
        <input name="surname" value={user.surname} onChange={handleChange} placeholder="Surname" required />
        {errors.surname && <span className="error">{errors.surname}</span>}
        
        <input name="dob" type="date" value={user.dob} onChange={handleChange} required />
        {errors.dob && <span className="error">{errors.dob}</span>}
        
        <input name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
        {errors.address && <span className="error">{errors.address}</span>}
        
        <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
        {errors.phone && <span className="error">{errors.phone}</span>}
        
        <input name="email" value={user.email} onChange={handleChange} placeholder="Email" type="email" required />
        {errors.email && <span className="error">{errors.email}</span>}
        
        <input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" required />
        {errors.password && <span className="error">{errors.password}</span>}
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;