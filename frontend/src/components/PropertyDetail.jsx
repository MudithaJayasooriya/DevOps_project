"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./PropertyDetail.css"
import axios from "axios"

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://3.110.81.190:3001/${id}`)
        setProperty(res.data)
      } catch (err) {
        console.error("Error fetching property:", err)
      }
    }
    fetchProperty()
  }, [id])

  if (!property)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    )

  return (
    <div className="property-detail">
      <div className="property-hero">
        <div className="property-images-gallery">
          {property.images?.length > 0 ? (
            <div className="main-image-container">
              <img
                className="gallery-image main-image"
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
              />
              {property.images.length > 1 && (
                <div className="thumbnail-grid">
                  {property.images.slice(1, 4).map((img, i) => (
                    <img
                      key={i}
                      className="thumbnail-image"
                      src={img || "/placeholder.svg"}
                      alt={`${property.title} ${i + 2}`}
                    />
                  ))}
                  {property.images.length > 4 && <div className="more-images">+{property.images.length - 4} more</div>}
                </div>
              )}
            </div>
          ) : (
            <img className="gallery-image" src={property.image || "/placeholder.svg"} alt={property.title} />
          )}
        </div>
      </div>

      <div className="property-details-box">
        <div className="property-header">
          <h1 className="property-title">{property.title}</h1>
          <div className="property-location">
            <span className="location-icon">📍</span>
            <span>
              {property.city}, {property.district}
            </span>
          </div>
          <div className="property-status-price">
            <span className={`status-badge ${property.status?.toLowerCase()}`}>{property.status}</span>
            <span className="property-price">${property.price?.toLocaleString()}</span>
          </div>
        </div>

        <div className="property-info-columns">
          <div className="property-column">
            <div className="info-item">
              <span className="info-icon">🛏️</span>
              <div className="info-content">
                <span className="info-number">{property.bedrooms}</span>
                <span className="info-label">Bedrooms</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🛁</span>
              <div className="info-content">
                <span className="info-number">{property.bathrooms}</span>
                <span className="info-label">Bathrooms</span>
              </div>
            </div>
          </div>

          <div className="property-column">
            <div className="info-item">
              <span className="info-icon">📐</span>
              <div className="info-content">
                <span className="info-number">{property.squareFootage}</span>
                <span className="info-label">sq ft</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🏠</span>
              <div className="info-content">
                <span className="info-number">{property.type || "House"}</span>
                <span className="info-label">Property Type</span>
              </div>
            </div>
          </div>
        </div>

        {property.description && (
          <div className="property-description">
            <h3>About this property</h3>
            <p>{property.description}</p>
          </div>
        )}

        <div className="seller-contact-section">
          <h3>Contact Seller</h3>
          <div className="seller-info">
            
            <div className="seller-details">
              <h4 className="seller-name">{property.contactName || "Property Owner"}</h4>
              <p className="seller-title">{property.seller?.title || "Real Estate Agent"}</p>
            </div>
          </div>

          <div className="contact-methods">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div className="contact-content">
                <span className="contact-label">Phone</span>
                <span className="contact-value">{property.contactPhone || "+1 (555) 123-4567"}</span>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div className="contact-content">
                <span className="contact-label">Email</span>
                <span className="contact-value">{property.contactEmail || "contact@realestate.com"}</span>
              </div>
            </div>
          </div>
         </div>
      </div>
    </div>
  )
}

export default PropertyDetail
