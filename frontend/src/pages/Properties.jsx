"use client"

import { useState, useEffect } from "react"
import "./Properties.css"
import { Link } from "react-router-dom"
import axios from "axios"

const Properties = () => {
  const [filters, setFilters] = useState({
    type: "",
    propertyType: "",
  })

  const [appliedFilters, setAppliedFilters] = useState({
    type: "",
    propertyType: "",
  })

  const [properties, setProperties] = useState({}) 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:3001/")
        const grouped = {}
        res.data.forEach((prop) => {
          const type = prop.propertyType || "Other"
          if (!grouped[type]) grouped[type] = []
          grouped[type].push({
            id: prop._id,
            title: prop.title,
            location: `${prop.city || ""}${prop.district ? ", " + prop.district : ""}`,
            status: prop.status || "For Sale",
            price: `Rs.${Number(prop.price).toLocaleString()}`,
            image: Array.isArray(prop.images) && prop.images.length > 0
              ? prop.images[0]
              : prop.image || "/placeholder.svg",
            beds: prop.bedrooms || 0,
            baths: prop.bathrooms || 0,
            area: prop.squareFootage ? `${prop.squareFootage} sq ft` : "N/A",
          })
        })
        setProperties(grouped)
      } catch (err) {
        console.error("Error fetching properties:", err)
      }
    }

    fetchProperties()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = () => {
    setAppliedFilters(filters)
  }

  const handleClearFilters = () => {
    setFilters({ type: "", propertyType: "" })
    setAppliedFilters({ type: "", propertyType: "" })
  }

  const filteredData = Object.fromEntries(
    Object.entries(properties).map(([category, items]) => [
      category,
      items.filter((item) => {
        const matchesType = appliedFilters.type
          ? item.status.toLowerCase().includes(
              appliedFilters.type === "sale" ? "for sale" : "for rent"
            )
          : true
        const matchesPropertyType = appliedFilters.propertyType
          ? category.toLowerCase().replace(/\s+/g, "_") === appliedFilters.propertyType.toLowerCase()
          : true
        return matchesType && matchesPropertyType
      }),
    ])
  )

  const totalFilteredProperties = Object.values(filteredData).flat().length

  return (
    <div className="properties-page">
      <section className="hero1">
        <div className="hero1-overlay">
          <h1>From First Homes to Forever Homes</h1>
          <p>Start Here</p>
        </div>
      </section>

<section className="property-filter-section">
  <div className="filter-header">
    <h3>Filter Properties</h3>
  </div>
  <div className="filter-grid">
    <div className="filter-group">
      <label htmlFor="type">Property For:</label>
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">Any</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>
    </div>
    <div className="filter-group">
      <label htmlFor="propertyType">Property Type:</label>
      <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
        <option value="">Any Type</option>
        <option value="standard_house">Standard House</option>
        <option value="luxury_house">Luxury House</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="town_house">Town House</option>
      </select>
    </div>
  </div>

  <div className="filter-actions">
    <button className="apply-filters-btn" onClick={handleApplyFilters}>
      Apply Filters
    </button>
    <button className="clear-filters-btn" onClick={handleClearFilters}>
      Clear Filters
    </button>
  </div>
</section>

      <div className="results-summary">
        <h1>Browse Properties by Type</h1>
        <p>
          {appliedFilters.type || appliedFilters.propertyType
            ? `Showing ${totalFilteredProperties} properties matching your filters`
            : `Showing all ${totalFilteredProperties} properties`}
        </p>
      </div>

      {Object.entries(filteredData).map(([category, items]) =>
        items.length > 0 ? (
          <div key={category} className="property-category">
            <h2>
              {category} ({items.length} {items.length === 1 ? "property" : "properties"})
            </h2>
            <div className="property-grid">
              {items.map((item) => (
                <div key={item.id} className="property-card">
                  <div className="property-image">
                    <img src={item.image} alt={item.title} />
                    <span className={`badge ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span>
                  </div>
                  <div className="property-info">
                    <h3>{item.title}</h3>
                    <p className="location">📍 {item.location}</p>
                    <div className="property-meta">
                      <span>🛏️ {item.beds} Beds</span>
                      <span>🛁 {item.baths} Baths</span>
                      <span>📐 {item.area}</span>
                    </div>
                    <div className="property-footer">
                      <strong className="price">{item.price}</strong>
                      <Link to={`/property/${item.id}`}>
                        <button className="view-btn">View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}

export default Properties
