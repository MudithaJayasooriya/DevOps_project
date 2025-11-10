import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [openIndex, setOpenIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    alert("Your message has been sent to our agent!");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const steps = [
    {
      number: "01",
      title: "Search & Browse",
      description:
        "Search our property listings using filters to find what you need. Browse our featured properties and save your favorites.",
      icon: "🔍",
      color: "#3498db",
    },
    {
      number: "02",
      title: "View Details",
      description:
        "See detailed photos, property information, location details, amenities, and pricing for each listing.",
      icon: "👁️",
      color: "#e74c3c",
    },
    {
      number: "03",
      title: "Contact Our Agent",
      description:
        "Speak with our expert real estate agents. Ask questions, get professional advice, and schedule property viewings.",
      icon: "📞",
      color: "#f39c12",
    },
    {
      number: "04",
      title: "Buy/Rent Through Agent",
      description:
        "Our experienced agents handle everything from paperwork to negotiations. Get your dream property hassle-free.",
      icon: "🏠",
      color: "#27ae60",
    },
  ];

  const agents = [
    {
      name: "Nimal Perera",
      phone: "+94 71 123 4567",
      email: "nimal@realestatepro.com",
      photo: "/images/imgq1.jpeg",
    },
    {
      name: "Sajini Fernando",
      phone: "+94 77 234 5678",
      email: "sajini@realestatepro.com",
      photo: "/images/imgq3.jpeg",
    },
    {
      name: "Amal De Silva",
      phone: "+94 76 345 6789",
      email: "amal@realestatepro.com",
      photo: "/images/imgq2.jpeg",
    },
    {
      name: "Thara Wijesinghe",
      phone: "+94 70 456 7890",
      email: "tharushi@realestatepro.com",
      photo: "/images/imgq4.jpeg",
    },
  ];

  const faqData = [
    {
      question: 'What types of properties do you specialize in?',
      answer: 'We specialize in residential homes, luxury estates, apartments, and commercial properties across various prime locations.',
    },
    {
      question: 'How can I list my property with HomeVista?',
      answer: 'Simply go to our "Contact" page, fill out the "List Your Property" form, or call our listing team. We’ll guide you through everything.',
    },
    {
      question: 'Do you offer property management services?',
      answer: 'Yes! We provide services like tenant screening, rent collection, maintenance, and legal compliance for landlords.',
    },
    {
      question: 'What are the typical steps in buying a property?',
      answer: 'Our process includes consultation, search, viewings, offers, negotiations, legal checks, and closing—with agent support at each step.',
    },
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="hero3">
        <div className="hero3-overlay">
          <h1>Let’s Make Your Next Move Together</h1>
          <p>Reach Out Today</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Follow these simple steps to find and secure your perfect property</p>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card" style={{ '--step-color': step.color }}>
                <div className="step-number">
                  <span>{step.number}</span>
                </div>
                
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    <div className="connector-arrow">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          

          <div className="process-benefits">
            <div className="benefit">
              <span className="benefit-icon">⚡</span>
              <span>Fast Process</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🛡️</span>
              <span>Secure & Safe</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">💯</span>
              <span>100% Support</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🎯</span>
              <span>Expert Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-agent-form">
        <h2>Contact Our Agents</h2>
        <p>Send us a message and our agent will get back to you shortly.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Agents Section */}
      <section className="agents-section">
        <h2>Get in Touch with Our Team</h2>
        <div className="agent-grid">
          {agents.map((agent, index) => (
            <div key={index} className="agent-card">
              <img src={agent.photo} alt={agent.name} className="agent-photo" />
              <h3>{agent.name}</h3>
              <p>📞 {agent.phone}</p>
              <p>✉️ <a href={`mailto:${agent.email}`}>{agent.email}</a></p>
              <a href={`mailto:${agent.email}`} className="agent-btn">Send Message</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-header">
          <p className="faq-subheading">FAQ</p>
          <h2 className="faq-main-heading">Frequently Asked Questions:<br />We're Here to Help</h2>
        </div>

        <div className="faq-container">
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => handleToggle(index)}>
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`chevron ${openIndex === index ? 'rotate' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
