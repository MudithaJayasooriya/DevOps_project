import "./Home.css"
import { Link } from "react-router-dom"
import { FaHome, FaBuilding, FaCity, FaHotel, FaWarehouse } from "react-icons/fa"

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Dream Property</h1>
          <p>Trusted Real Estate Solutions.</p>
          <Link to="/Properties" className="hero-btn">
            Browse Listings
          </Link>
        </div>
      </section>

      <section className="property-types">
        <h2>Property Types We Have</h2>
        <div className="types-grid">
          <div className="type-card">
            <FaHome className="type-icon" />
            <h3>Standard House</h3>
          </div>
          <div className="type-card">
            <FaHotel className="type-icon" />
            <h3>Luxury House</h3>
          </div>
          <div className="type-card">
            <FaBuilding className="type-icon" />
            <h3>Apartments</h3>
          </div>
          <div className="type-card">
            <FaCity className="type-icon" />
            <h3>Villa</h3>
          </div>
          <div className="type-card">
            <FaWarehouse className="type-icon" />
            <h3>Town House</h3>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-content-wrapper">
          <div className="stats-text-area">
            <h2 className="stats-main-heading">
              We are committed to offering exceptional insights, guidance, and assistance at every stage of your real
              estate journey.
            </h2>
          </div>

          <div className="stats-line-divider"></div>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">850+</span>
              <p className="stat-description">ELEGANT APARTMENTS</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">18k</span>
              <p className="stat-description">SATISFIED GUESTS</p>
            </div>
            <div className="stat-item">
              <span className="stat-number">2k</span>
              <p className="stat-description">HAPPY OWNERS</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Property Listings</h3>
            <p>View properties for sale or rent across the country.</p>
          </div>
          <div className="service-card">
            <h3>Legal & Documentation</h3>
            <p>We assist you through legal and ownership documentation.</p>
          </div>
          <div className="service-card">
            <h3>Property Valuation</h3>
            <p>Get your property evaluated by our experts.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-left-column">
          <div className="cta-content">
            <h2 className="cta-heading">FIND YOUR DREAM HOME</h2>
            <p className="cta-description">
              Explore our extensive listings of homes for sale. From cozy apartments to luxurious estates, we have a
              property that fits your lifestyle and budget.
            </p>
          </div>
        </div>

        <div className="cta-right-column">
          <div className="cta-content">
            <h2 className="cta-heading">DISCOVER RENTAL OPPORTUNITIES</h2>
            <p className="cta-description">
              Looking for a rental? Browse through our curated selection of properties available for rent, from
              short-term leases to long-term residencies.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
