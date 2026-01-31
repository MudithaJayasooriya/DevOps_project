import React, { useState } from 'react';
import './Auth.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sign_up = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null); // { message: string, type: 'success' | 'error' }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation before sending request
    if (!username || !email || !password) {
      setNotification({ message: "Please fill all fields.", type: "error" });
      return;
    }

    try {
      const result = await axios.post("http://3.110.81.190:3001/users/signup", { username, email, password });

      if (result.data.status === "success") {
        setNotification({ message: "User registered successfully!", type: "success" });

        // Redirect after short delay so user can see message
        setTimeout(() => navigate("/Log_in"), 1500);
      } else {
        // Backend returned status but not success (unlikely here)
        setNotification({ message: result.data.message || "Signup failed", type: "error" });
      }
    } catch (err) {
      // err.response?.data.message is backend error message if available
      const errorMsg = err.response?.data?.message || "Signup failed. Please try again.";
      setNotification({ message: errorMsg, type: "error" });
    }
  };

  return (
    <div className="auth-container signup-container">
      <div className='auth-card'>
        <h2>SIGN UP</h2>

        {notification && (
          <div
            className={`notification ${notification.type === "success" ? "success" : "error"}`}
            role="alert"
          >
            {notification.message}
          </div>
        )}

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
          <p>
            Already have an account? <Link to="/Log_in">LOG IN</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign_up;
