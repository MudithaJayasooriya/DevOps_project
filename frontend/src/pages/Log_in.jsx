import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

// ✅ Read backend URL from environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Please fill all fields");

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { username: username.trim(), password: password.trim() },
        { withCredentials: true } // ✅ ensures cookies are sent if you use sessions
      );

      if (res.data?.status === "success") {
        const userObj = res.data.user;

        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(userObj));

        // Redirect to home page
        navigate("/", { replace: true });
      } else {
        alert(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert(`Login failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container login-container">
      <div className="auth-card">
        <h2>LOG IN</h2>
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

export default Login;
