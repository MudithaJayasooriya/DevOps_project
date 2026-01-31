"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import "../pages/AdminDashboard.css"
import AdminNavbar from "../components/AdminNavbar"

function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("For Sale")
  const [propertyType, setPropertyType] = useState("Standard House")
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [squareFootage, setSquareFootage] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const roleHeader = { 
    headers: { 
      "x-role": "admin",
      "Content-Type": "application/json"
    } 
  }

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://3.110.81.190:3001/admin/properties", roleHeader)
      setProperties(res.data)
    } catch (err) {
      setError("Failed to fetch properties")
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return
    
    try {
      console.log("Attempting to delete property with ID:", id);
      
      const response = await axios.delete(
        `http://3.110.81.190:3001/admin/properties/${id}`, 
        roleHeader
      );
      
      console.log("Delete response:", response);
      
      if (response.status === 200) {
        setProperties(properties.filter((p) => p._id !== id));
        alert("Property deleted successfully!");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error("Delete error details:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        alert(`Failed to delete property: ${err.response.data.message || err.response.status}`);
      } else {
        alert(`Failed to delete property: ${err.message}`);
      }
    }
  }

  const startEdit = (property) => {
    setEditingId(property._id)
    setTitle(property.title)
    setCity(property.city)
    setDistrict(property.district || "")
    setPrice(property.price || "")
    setStatus(property.status || "For Sale")
    setPropertyType(property.propertyType || "Standard House")
    setBedrooms(property.bedrooms || 1)
    setBathrooms(property.bathrooms || 1)
    setSquareFootage(property.squareFootage || "")
    setDescription(property.description || "")
    setImage(null)
    setImagePreview(property.images && property.images.length > 0 ? property.images[0] : null)
    setShowForm(true)
  }

  const startAdd = () => {
    setEditingId(null)
    setShowForm(true)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setCity("")
    setDistrict("")
    setPrice("")
    setStatus("For Sale")
    setPropertyType("Standard House")
    setBedrooms(1)
    setBathrooms(1)
    setSquareFootage("")
    setDescription("")
    setImage(null)
    setImagePreview(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setShowForm(false)
    resetForm()
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "realestate_unsigned");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dumvphg8i/image/upload",
          form
        );
        uploadedImages.push(res.data.secure_url);
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Image upload failed.");
      }
    }

    setImagePreview(uploadedImages[0]);
    setImage(uploadedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      title,
      city,
      district,
      price: Number(price),
      status,
      propertyType,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      squareFootage: Number(squareFootage),
      description,
      images: image || [],
      ownerType: "admin"
    };

    try {
      let res;
      if (editingId) {
        res = await axios.put(
          `http://3.110.81.190:3001/admin/properties/${editingId}`,
          propertyData,
          roleHeader
        );
        setProperties(properties.map((p) => (p._id === editingId ? res.data : p)));
      } else {
        res = await axios.post(
          "http://3.110.81.190:3001/admin/properties",
          propertyData,
          roleHeader
        );
        setProperties([...properties, res.data]);
      }
      cancelEdit();
    } catch (err) {
      alert("Failed to save property");
      console.error(err);
    }
  };

  const displayedProperties = properties

  const totalProperties = properties.length
  const forSale = properties.filter((p) => p.status === "For Sale").length
  const forRent = properties.filter((p) => p.status === "For Rent").length

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="admin-container">
      <AdminNavbar />

      <header className="admin-header">
        <h1 className="admin-title">
          <i className="icon-dashboard"></i>
          Real Estate Admin Dashboard
        </h1>
        <button className="add-property-btn" onClick={startAdd}>
          <i className="icon-plus"></i>
          Add New Property
        </button>
      </header>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{totalProperties}</div>
          <div className="stat-label">Total Properties</div>
        </div>
        <div className="stat-card sale">
          <div className="stat-number">{forSale}</div>
          <div className="stat-label">For Sale</div>
        </div>
        <div className="stat-card rent">
          <div className="stat-number">{forRent}</div>
          <div className="stat-label">For Rent</div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? "Edit Property" : "Add New Property"}</h2>
              <button className="close-btn" onClick={cancelEdit}>
                &times;
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="Property title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>District</label>
                  <input
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Property Type</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                    <option value="Standard House">Standard House</option>
                    <option value="Luxury House">Luxury House</option>
                    <option value="Villa">Villa</option>
                    <option value="Town House">Town House</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    placeholder="Number of bedrooms"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Bathrooms</label>
                  <input
                    type="number"
                    placeholder="Number of bathrooms"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Square Footage</label>
                  <input
                    type="number"
                    placeholder="Square footage"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  placeholder="Property description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="form-group full-width">
                <label>Property Image</label>
                <div className="image-upload-area">
                  <input type="file" onChange={handleImageChange} accept="image/*" id="image-upload" multiple />
                  <label htmlFor="image-upload" className="image-upload-label">
                    Choose Image
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={cancelEdit} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingId ? "Update Property" : "Add Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Properties Table */}
      {displayedProperties.length === 0 ? (
        <div className="no-properties">
          <h3>No properties found</h3>
          <p>Add new properties to get started</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProperties.map((property) => (
                <tr key={property._id}>
                  <td className="image-cell">
                    {property.images && property.images.length > 0 ? (
                      <img src={property.images[0]} alt={property.title} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                  <td className="title-cell">
                    <div className="property-title">{property.title}</div>
                  </td>
                  <td>
                    <div className="location">
                      <div>{property.city}</div>
                      {property.district && <small>{property.district}</small>}
                    </div>
                  </td>
                  <td className="price-cell">
                    <span className="price">Rs.{property.price?.toLocaleString()}</span>
                  </td>
                  <td>{property.propertyType}</td>
                  <td>{property.status}</td>
                  <td>
                    <div className="property-details">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      {property.squareFootage && <span>{property.squareFootage} sq ft</span>}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => startEdit(property)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(property._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard