import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import {FaParking,FaDumbbell,FaSeedling,FaSwimmingPool,FaWifi,FaShieldAlt,FaCat,FaStethoscope,FaEye,FaBullseye,FaFlagCheckered,
} from "react-icons/fa";
import {MdOutlineSecurity,MdOutlinePlayArrow,MdOutlineCameraAlt,} from "react-icons/md";

const amenities = [
  { icon: <FaParking />, label: "Car Parking" },
  { icon: <FaDumbbell />, label: "Fitness Center" },
  { icon: <FaSeedling />, label: "Rooftop Garden" },
  { icon: <FaSwimmingPool />, label: "Indoor Pool" },
  { icon: <MdOutlinePlayArrow />, label: "Playground" },
  { icon: <MdOutlineSecurity />, label: "Private Security" },
  { icon: <FaWifi />, label: "Free Wifi" },
  { icon: <MdOutlineCameraAlt />, label: "CCTV Coverage" },
  { icon: <FaCat />, label: "Pet Friendly" },
  { icon: <FaStethoscope />, label: "Medical Service" },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Downtown Condo",
    text: "Working with this team was incredible. They found us the perfect home in just 2 weeks and negotiated a great price. Their local market knowledge is unmatched!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Suburban Family Home",
    text: "As first-time buyers, we were nervous about the process. The team guided us every step of the way and made everything so smooth. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Investment Property",
    text: "I've worked with many real estate agents, but none compare to this team's professionalism and dedication. They helped me build my investment portfolio successfully.",
    rating: 5,
  },
];

const credentials = [
  { icon: "\ud83c\udfc6", title: "15+ Years", subtitle: "In Real Estate" },
  { icon: "\ud83c\udfe0", title: "500+", subtitle: "Homes Sold" },
  { icon: "\u2b50", title: "4.9/5", subtitle: "Client Rating" },
  { icon: "\ud83c\udfaf", title: "98%", subtitle: "Success Rate" },
];

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={`star ${index < rating ? "filled" : ""}`}>★</span>
  ));
};

const About = () => {
  const navigate = useNavigate(); 
  return (
    <div className="about-page">
      <section className="hero2">
        <div className="hero2-overlay">
          <h1>Helping You Find More Than Just a House</h1>
          <p>We Help You Find Home</p>
        </div>
      </section>
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h1>About Our Real Estate Company</h1>
              <h2>Your Trusted Partner in Real Estate</h2>
              <p className="mission-statement">
                Founded in 2008, we've been dedicated to helping families and investors find their perfect properties in
                the greater metropolitan area. Our mission is to provide exceptional real estate services with
                integrity, expertise, and personalized attention to every client.
              </p>
              <p>
                What sets us apart is our deep understanding of local markets, innovative marketing strategies, and
                commitment to building lasting relationships. We believe that buying or selling a home should be an
                exciting journey, not a stressful experience.
              </p>
              <div className="values">
                <h3>Our Core Values</h3>
                <ul>
                  <li>
                    <strong>Integrity:</strong> Honest and transparent communication in every transaction
                  </li>
                  <li>
                    <strong>Excellence:</strong> Delivering superior service and results
                  </li>
                  <li>
                    <strong>Innovation:</strong> Using cutting-edge technology and marketing
                  </li>
                  <li>
                    <strong>Community:</strong> Supporting and giving back to our local neighborhoods
                  </li>
                </ul>
              </div>
            </div>
            <div className="story-image">
              <img src='/images/img23.jpeg' alt="Our real estate office" />
            </div>
          </div>
        </div>
      </section>

      <section className="mission-modern">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-subtitle">
          We strive to transform your property dreams into reality through trust, transparency, and service excellence.
        </p>
        <div className="mission-cards">
          <div className="mission-card">
            <FaEye className="mission-icon" />
            <h3>Vision</h3>
            <p>At HomeVista, our vision is to become a trusted leader in the real estate industry by setting new standards of excellence in service, transparency, and innovation...</p>
          </div>
          <div className="mission-card">
            <FaBullseye className="mission-icon" />
            <h3>Mission</h3>
            <p>Our mission is to provide exceptional real estate services that guide clients with confidence and care through every step of their property journey...</p>
          </div>
          <div className="mission-card">
            <FaFlagCheckered className="mission-icon" />
            <h3>Goals</h3>
            <p>At HomeVista, our goal is to simplify the real estate journey by connecting people with the right properties and empowering them with knowledge, transparency, and personalized support...</p>
          </div>
        </div>
      </section>

      <section className="choose-gallery-wrapper">
        <div className="choose-us-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✅ Trusted by 500+ satisfied clients</li>
            <li>✅ Verified property listings only</li>
            <li>✅ 24/7 Customer Support</li>
            <li>✅ Professional & Experienced Agents</li>
            <li>✅ Hassle-free legal process</li>
          </ul>
        </div>
        <div className="diamond-gallery">
          <div className="diamond-wrapper">
            <div className="diamond-row">
              <div className="diamond"><img src="/images/img8.jpeg" alt="View 1" /></div>
            </div>
            <div className="diamond-row">
              <div className="diamond"><img src="/images/img10.jpeg" alt="View 2" /></div>
              <div className="diamond"><img src="/images/img11.jpeg" alt="View 3" /></div>
            </div>
            <div className="diamond-row">
              <div className="diamond"><img src="/images/img12.jpeg" alt="View 4" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="amenities-section">
        <h2>Real Amenities</h2>
        <p className="amenities-description">
          Experience the perfect blend of comfort and convenience with real amenities designed to enhance your lifestyle.
        </p>
        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <div key={index} className="amenity-card">
              <div className="amenity-icon">{item.icon}</div>
              <div className="amenity-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="credentials">
        <div className="container">
          <h2>Experience & Credentials</h2>
          <p className="credentials-intro">
            Our proven track record and professional certifications demonstrate our commitment to excellence.
          </p>
          <div className="stats-grid">
            {credentials.map((item, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{item.icon}</div>
                <div className="stat-number">{item.title}</div>
                <div className="stat-label">{item.subtitle}</div>
              </div>
            ))}
          </div>
          <div className="certifications">
            <h3>Professional Certifications & Memberships</h3>
            <div className="cert-list">
              <div className="cert-item">
                <h4>Licensed Real Estate Broker</h4>
                <p>State Real Estate Commission - License #RE123456</p>
              </div>
              <div className="cert-item">
                <h4>National Association of Realtors (NAR)</h4>
                <p>Active member since 2008</p>
              </div>
              <div className="cert-item">
                <h4>Certified Residential Specialist (CRS)</h4>
                <p>Advanced training in residential real estate</p>
              </div>
              <div className="cert-item">
                <h4>Graduate, Realtor Institute (GRI)</h4>
                <p>Comprehensive real estate education program</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <p className="testimonials-intro">
            Don't just take our word for it - hear from the families and investors we've helped.
          </p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">{renderStars(testimonial.rating)}</div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
         <div className="testimonial-cta">
      <h3>Ready to Join Our Happy Clients?</h3>
      <p>Contact us today to start your real estate journey</p>
      <button className="cta-button" onClick={() => navigate('/Contact')}>
        Get Started Today
      </button>
    </div>
        </div>
      </section>
    </div>
  );
};

export default About;
