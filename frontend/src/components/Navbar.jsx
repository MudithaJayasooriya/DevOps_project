// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const pathToName = {
    "/": "Home",
    "/sign_up": "Sign Up",
    "/log_in": "Log In",
  };

  const currentLink = pathToName[location.pathname] || "";

  return (
    <nav className="navbar">
  <div className="navbar-logo">
    <Link to="/" style={{ textDecoration: "none" }}>
      HomeVista
    </Link>
  </div>

  <div className="navbar-right">
    <ul className="navbar-links">
      <li className={currentLink === "Home" ? "active" : ""}>
        <Link to="/">Home</Link>
      </li>
       <div className="navbar-buttons">
      <Link to="/log_in">
        <button className="login-button">Log In</button>
      </Link>
      <Link to="/sign_up">
        <button className="signup-button">Sign Up</button>
      </Link>
    </div>
    </ul>

   
  </div>
</nav>

  );
};

export default Navbar;
