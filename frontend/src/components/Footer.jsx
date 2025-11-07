// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaInfoCircle,
  FaEnvelopeOpenText
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand Section with Home Icon */}
        <div className="footer-brand">
          <FaHome className="footer-logo-icon" />
          <h3>RealEstatePro</h3>
          <p>Your trusted real estate partner for all your buying, selling, and renting needs.</p>
          <div className="footer-socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><FaHome className="footer-icon" /><Link to="/">Home</Link></li>
            <li><FaInfoCircle className="footer-icon" /><Link to="/about">About</Link></li>
            <li><FaEnvelopeOpenText className="footer-icon" /><Link to="/contact">Contact</Link></li>
            <li><FaHome className="footer-icon" /><Link to="/Properties">Listings</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4>Contact Us</h4>
          <p><FaEnvelope className="footer-icon" /> info@realestatepro.com</p>
          <p><FaPhoneAlt className="footer-icon" /> +94 76 123 4567</p>
          <p><FaMapMarkerAlt className="footer-icon" /> Colombo, Sri Lanka</p>
        </div>
      </div>

      <p className="footer-bottom">&copy; 2025 RealEstatePro. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
