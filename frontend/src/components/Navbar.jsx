import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const pathToName = {
    "/": "Home",
    "/about": "About",
    "/properties": "Properties",
    "/contact": "Contact",
    "/add_your_home": "Add Your Home",
    "/sign_up": "Sign Up",
    "/log_in": "Log In",
  };

  const currentLink = pathToName[location.pathname] || "";

  const handleLogout = async () => {
    if (logout) {
      await logout(); 
    }
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          HomeVista
        </Link>
      </div>

      <ul className="navbar-links">
        <li className={currentLink === "Home" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={currentLink === "About" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li className={currentLink === "Properties" ? "active" : ""}>
          <Link to="/properties">Properties</Link>
        </li>
        <li className={currentLink === "Contact" ? "active" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
        {user && (
          <li className={currentLink === "Add Your Home" ? "active" : ""}>
            <Link to="/add_your_home">Add Your Home</Link>
          </li>
        )}
      </ul>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/log_in">
              <button className="login-button">Log In</button>
            </Link>
            <Link to="/sign_up">
              <button className="signup-button">Sign Up</button>
            </Link>
          </>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
