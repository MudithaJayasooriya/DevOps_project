import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

function Log_in() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // { message, type: 'success' | 'error' }
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setNotification({ message: "Please fill all fields.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post("http://localhost:3001/users/login", { username, password });

      if (result.data && result.data.status === "success") {
        const userObj = result.data.user;
        const token = result.data.token;
        login(userObj, token);

        setNotification({ message: "Login successful! Redirecting...", type: "success" });

        setTimeout(() => {
          if (userObj.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else {
            navigate("/add_your_home", { replace: true });
          }
        }, 1500);
      } else {
        setNotification({ message: result.data?.message || "Invalid credentials", type: "error" });
      }
    } catch (err) {
      setNotification({ message: `Login failed: ${err.response?.data?.message || err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container login-container">
      <div className="auth-card">
        <h2>LOG IN</h2>

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
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/sign_up">SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Log_in;
