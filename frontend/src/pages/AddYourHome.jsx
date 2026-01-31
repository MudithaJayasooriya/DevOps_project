import React, { useState, useEffect, useMemo, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import "./AddYourHome.css";
import axios from "axios";


const AddYourHome = () => {
  const { user } = useContext(AuthContext); 
  const [activeTab, setActiveTab] = useState("add");
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "",
    status: "For Sale",
    city: "",
    district: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    images: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const propertyTypes = useMemo(
    () => ["Standard House", "Luxury House", "Villa", "Town House", "Apartment"],
    []
  );

  const propertyStatuses = ["For Sale", "For Rent"];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://3.110.81.190:3001/");
        const userProperties = res.data.filter((p) => p.ownerType !== "admin");
        setProperties(userProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
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
        console.error("Error uploading image to Cloudinary:", err);
        showNotification("Image upload failed.", "error");
      }
    }

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      propertyType: "",
      status: "For Sale",
      city: "",
      district: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      images: [],
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    });
    setEditingProperty(null);
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add("show"), 100);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.propertyType) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    if (!user) {
      showNotification("You must be logged in to add a property.", "error");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        squareFootage: Number(formData.squareFootage) || 0,
      };

      let res;

      if (editingProperty) {
        const endpoint =
  editingProperty.ownerType === "admin"
    ? `http://3.110.81.190:3001/admin/properties/${editingProperty._id}`
    : `http://3.110.81.190:3001/user/${editingProperty._id}`;

        const headers =
          editingProperty.ownerType === "admin" ? { "x-role": "admin" } : {};

        res = await axios.put(endpoint, payload, { headers });

        setProperties((prev) =>
          prev.map((p) => (p._id === editingProperty._id ? res.data : p))
        );
        showNotification("Property updated successfully!");
      } else {
        const endpoint =
  user?.role === "admin"
    ? "http://3.110.81.190:3001/admin/properties"
    : "http://3.110.81.190:3001/user";

        const headers = user?.role === "admin" ? { "x-role": "admin" } : {};

        res = await axios.post(endpoint, payload, { headers });
        setProperties((prev) => [...prev, res.data]);
        showNotification("Property added successfully!");
      }

      resetForm();
      setActiveTab("manage");
    } catch (err) {
      console.error("Error saving property:", err);
      showNotification("Error saving property. Please try again.", "error");
    }
  };

const handleEdit = (property) => {
  setEditingProperty(property);
  setFormData(property);
  setActiveTab("add");
};

const confirmDelete = (property) => {
  setPropertyToDelete(property);
  setShowDeleteModal(true);
};

const handleDelete = async () => {
  if (!propertyToDelete) return;

  try {
    const endpoint =
  propertyToDelete.ownerType === "admin"
    ? `http://3.110.81.190:3001/admin/properties/${propertyToDelete._id}`
    : `http://3.110.81.190:3001/user/${propertyToDelete._id}`;

    const headers =
      propertyToDelete.ownerType === "admin" ? { "x-role": "admin" } : {};

    const res = await axios.delete(endpoint, { headers });
    console.log("Delete response:", res.data);

    setProperties((prev) =>
      prev.filter((p) => p._id !== propertyToDelete._id)
    );

    showNotification("Property deleted successfully!");
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  } catch (err) {
    console.error("Error deleting property:", err);
    showNotification("Error deleting property.", "error");
  }
};


  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price);
  return (

     
    
    
    <div className="add-your-home">
      <div className="container">
        <div className="header">
          <h1>Property Management</h1>
          <p>Add, edit, and manage your real estate listings</p>
        </div>

<div style={{ textAlign: "center", marginTop: "50px"  , color: "#ff6600", fontFamily: "Arial, sans-serif" , marginBottom: "20px"}}>
      
      <h2>Welcome! You are now logged in.</h2>
</div>


        <div className="tabs">
          <div className="tab-buttons">
            <button className={`tab-button ${activeTab === "add" ? "active" : ""}`} onClick={() => setActiveTab("add")}>
              <span className="icon">🏠</span>
              {editingProperty ? "Edit Property" : "Add Property"}
            </button>
            <button
              className={`tab-button ${activeTab === "manage" ? "active" : ""}`}
              onClick={() => setActiveTab("manage")}
            >
              <span className="icon">📋</span>
              Manage Properties ({properties.length})
            </button>
          </div>

          {activeTab === "add" && (
            <div className="tab-content">
              <div className="card">
                <div className="card-header">
                  <h2>{editingProperty ? "Edit Property" : "Add New Property"}</h2>
                  <p>
                    {editingProperty
                      ? "Update your property information"
                      : "Fill in the details to list your property. It will automatically appear in the correct category on the Properties page."}
                  </p>
                </div>
                  <div className="card-content">
                  <form onSubmit={handleSubmit} className="property-form">
  <div className="form-section">
    <h3>
      <span className="icon">🏠</span> Basic Information
    </h3>
     <div className="form-grid">
      <div className="form-group">
        <label htmlFor="title">Property Title *</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />
      </div>
      <div className="form-group">
      <label htmlFor="propertyType">Property Type *</label>
      <select
    id="propertyType"
    value={formData.propertyType}
    onChange={(e) => handleInputChange("propertyType", e.target.value)}
    required
   >
    <option value="">Select Property Type</option>
    {propertyTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
   </select>
  
</div>
<div className="form-group">
  <label htmlFor="price">Price *</label>
  <input
  type="number"
  id="price"
  value={formData.price}
  onChange={(e) => handleInputChange("price", e.target.value)}
  required
/>

</div>


      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
        >
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
      </div>
    </div>


    <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        rows="4"
      />
    </div>
  </div>

  {/* Location */}
  <div className="form-section">
    <h3>
      <span className="icon">📍</span> Location
    </h3>
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={formData.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="district">District</label>
        <input
          type="text"
          id="district"
          value={formData.district}
          onChange={(e) => handleInputChange("district", e.target.value)}
        />
      </div>
    </div>
  </div>

  <div className="form-section">
    <h3>
      <span className="icon">📐</span> Property Details
    </h3>
    <div className="form-grid form-grid-3">
      <div className="form-group">
        <label htmlFor="bedrooms">🛏️ Bedrooms</label>
        <input
          type="number"
          id="bedrooms"
          value={formData.bedrooms}
          onChange={(e) => handleInputChange("bedrooms", e.target.value)}
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="bathrooms">🛁 Bathrooms</label>
        <input
          type="number"
          id="bathrooms"
          step="0.5"
          value={formData.bathrooms}
          onChange={(e) => handleInputChange("bathrooms", e.target.value)}
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="squareFootage">Square Feet</label>
        <input
          type="number"
          id="squareFootage"
          value={formData.squareFootage}
          onChange={(e) => handleInputChange("squareFootage", e.target.value)}
          min="0"
        />
      </div>
    </div>
  </div>

  <div className="form-section">
    <h3>
      <span className="icon">📷</span> Property Images
    </h3>
    <div className="form-group">
      <label htmlFor="images">Upload Images</label>
      <input type="file" id="images" multiple accept="image/*" onChange={handleImageUpload} />
    </div>
    {formData.images.length > 0 && (
      <div className="image-preview-grid">
        {formData.images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image || "/placeholder.svg"} alt={`Property ${index + 1}`} />
            <button type="button" className="remove-image" onClick={() => removeImage(index)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    )}
  </div>

  <div className="form-section">
    <h3>
      <span className="icon">📞</span> Contact Information
    </h3>
    <div className="form-grid form-grid-3">
      <div className="form-group">
        <label htmlFor="contactName">Contact Name</label>
        <input
          type="text"
          id="contactName"
          value={formData.contactName}
          onChange={(e) => handleInputChange("contactName", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contactEmail">Email</label>
        <input
          type="email"
          id="contactEmail"
          value={formData.contactEmail}
          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contactPhone">Phone</label>
        <input
          type="tel"
          id="contactPhone"
          value={formData.contactPhone}
          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
        />
      </div>
    </div>
  </div>

  {/* Submit Buttons */}
  <div className="form-actions">
    <button type="submit" className="btn btn-primary">
      {editingProperty ? "Update Property" : "Add Property"}
    </button>
    {editingProperty && (
      <button type="button" className="btn btn-secondary" onClick={resetForm}>
        Cancel Edit
      </button>
    )}
  </div>
</form>

                </div>
              </div>
            </div>
          )}

         {activeTab === "manage" && (
  <div className="tab-content">
    {properties.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">🏠</div>
        <h3>No Properties Yet</h3>
        <p>Start by adding your first property listing.</p>
        <button className="btn btn-primary" onClick={() => setActiveTab("add")}>
          Add Your First Property
        </button>
      </div>
    ) : (
      <div className="properties-grid">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <div className="property-image">
              {property.images && property.images.length > 0 ? (
                <img src={property.images[0] || "/placeholder.svg"} alt={property.title} />
              ) : (
                <div className="no-image">
                  <span>🏠</span>
                </div>
              )}
              <div className={`status-badge ${property.status?.toLowerCase().replace(" ", "-") || ""}`}>
                {property.status || "N/A"}
              </div>
             </div>

             <div className="property-content">
              <h3>{property.title || "Untitled"}</h3>
              <div className="price">{formatPrice(property.price || 0)}</div>
              <p className="description">{property.description || "No description"}</p>

              <div className="property-details">
                <span>🛏️ {property.bedrooms ?? 0}</span>
                <span>🛁 {property.bathrooms ?? 0}</span>
                <span>📐 {(property.squareFootage ?? 0).toLocaleString()} sq ft</span>
              </div>

              <div className="property-location">
                📍 {property.city || "Unknown"}, {property.district || "Unknown"}
              </div>

              <div className="property-type-badge">
                Category: {typeof property.propertyType === "string" ? property.propertyType : property.propertyType?.toString() || "Other"}
              </div>

              <div className="property-actions">
                <button className="btn btn-outline" onClick={() => handleEdit(property)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-danger" onClick={() => confirmDelete(property)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Property</h3>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete "{propertyToDelete?.title}"? This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}  
    </div>
  )
}

export default AddYourHome
