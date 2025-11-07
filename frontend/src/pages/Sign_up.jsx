import React, { useState } from 'react';
import './Auth.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Sign_up = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${API_URL}/signup`, { username, email, password })
      .then((result) => {
        console.log(result);
        navigate("/Log_in");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-container signup-container">
      <div className='auth-card'>
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Name</label>
            <input type="text" id="username" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="auth-button">SIGN UP</button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/Log_in">LOG IN</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Sign_up;
