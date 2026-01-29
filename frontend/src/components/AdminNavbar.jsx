import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");  

    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: "none"}}>
          HomeVista
        </Link>
      </div>

      <h3 className="logo">Admin Panel</h3>

      <ul>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
