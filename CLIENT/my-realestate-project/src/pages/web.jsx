

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./web.css";

function Web() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "N/A";
  const email = localStorage.getItem("email") || "guest@example.com";
  const userName = localStorage.getItem("userName") || email.split("@")[0];

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search input

  const goToBasicInfo = () => {
   navigate("/basicinfo", { state: { userId, userName, email } });

  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const updated = data.map((item) => ({
          ...item,
          views: Math.floor(Math.random() * 100) + 1,
          daysLeft: Math.floor(Math.random() * 90) + 1,
          status: Math.random() < 0.5 ? "Sold" : "Unsold",
        }));

        setProperties(updated);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsPopupOpen(true);
  };

  const handleEdit = (property) => {
    setEditFormData(property);
    setIsEditFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${editFormData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();

      setProperties((prev) =>
        prev.map((prop) => (prop._id === updated._id ? updated : prop))
      );

      setIsEditFormOpen(false);
      alert("Property updated!");
    } catch (err) {
      alert("Error updating: " + err.message);
    }
  };

  const filteredProperties = searchQuery.trim()
    ? properties.filter((p) =>
        p.userId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : properties;

  return (
    <div className="webdash-container">
      <Sidebar />
      <div className="webdash-main">
        <div className="webdash-top">
          <p className="p1">USER ID : {userId}</p>
          <div className="user-dropdown-wrapper">
            <p className="p2" style={{ cursor: "pointer" }}>
              👤 {email.split("@")[0]}
              <span>
                <i
                  className="fas fa-chevron-down"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  style={{ fontSize: "12px", marginLeft: "3px" }}
                ></i>
              </span>
            </p>
            {showDropdown && (
              <div className="logout-dropdown">
                <button onClick={handleLogout} className="logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <hr style={{ color: "#E1F9F4" }} />

        <div className="webdash-search-bar">
          <div className="webdash-search-input-wrapper">
            <input
              type="text"
              placeholder="Search PPD ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
          </div>

          <button className="webdash-add-button" onClick={goToBasicInfo}>
            + Add Property
          </button>
        </div>

        <div className="webdash-table-wrapper">
          <div className="webdash-table-full">
            <div className="webdash-table-header">
              <div>PPD ID</div>
              <div>Image</div>
              <div>Property</div>
              <div>Contact</div>
              <div>Area</div>
              <div>Views</div>
              <div>Status</div>
              <div>Days Left</div>
              <div>Action</div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="webdash-table-row">
                <div style={{ gridColumn: "span 9", textAlign: "center" }}>
                  No results found.
                </div>
              </div>
            ) : (
              filteredProperties.map((property) => (
                <div className="webdash-table-row" key={property._id}>
                  <div>{property.userId}</div>
                  <div>
                    <img
                      src={
                        property.imagePath
                          ? `http://localhost:5000/${property.imagePath}`
                          : "https://via.placeholder.com/40"
                      }
                      alt="property"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                  </div>
                  <div>{property.propertyType}</div>
                  <div>{property.mobile || "-"}</div>
                  <div>{property.area || "-"}</div>
                  <div>{property.views}</div>
                  <div>
                    <span
                      className={
                        property.status === "Sold"
                          ? "webdash-status-sold"
                          : "webdash-status-unsold"
                      }
                      style={{ color: "#416899" }}
                    >
                      {property.status}
                    </span>
                  </div>
                  <div>{property.daysLeft}</div>
                  <div className="webdash-action-icons">
                    <button onClick={() => handleViewDetails(property)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button onClick={() => handleEdit(property)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* View Popup */}
      {isPopupOpen && selectedProperty && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Property Details</h2>
            <div className="popup-details">
              {Object.entries(selectedProperty).map(
                ([key, value]) =>
                  !["__v", "updatedAt", "createdAt", "views", "daysLeft"].includes(
                    key
                  ) && (
                    <p key={key}>
                      <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong>{" "}
                      {value || "-"}
                    </p>
                  )
              )}
            </div>
            <button onClick={() => setIsPopupOpen(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditFormOpen && (
        <div className="popup-overlay">
          <div className="edit-form-content">
            <h2>Edit Property</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-grid">
                {Object.keys(editFormData).map(
                  (key) =>
                    !["_id", "__v", "createdAt", "updatedAt", "views", "daysLeft"].includes(
                      key
                    ) && (
                      <div className="form-group" key={key}>
                        <label>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
                        <input
                          type="text"
                          name={key}
                          value={editFormData[key] || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    )
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditFormOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Web;
