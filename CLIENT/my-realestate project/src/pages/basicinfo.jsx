import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./basicinfo.css";
import Sidebar from "./Sidebar";

function BasicInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userId = "N/A", userName = "Guest", email: locationEmail = "guest@example.com" } = location.state || {};

  const [basicInfoFormData, setBasicInfoFormData] = useState({
    propertyType: "",
    negotiable: "",
    price: "",
    ownership: "",
    propertyAge: "",
    propertyApproved: "",
    propertyDescription: "",
    bankLoan: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [email] = useState(locationEmail);

  const handleChange = (e) => {
    setBasicInfoFormData({
      ...basicInfoFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    for (const key in basicInfoFormData) {
      if (!basicInfoFormData[key]) {
        alert(`Please fill in the ${key.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    navigate("/propertydetails", {
      state: {
        userId,
        userName,
        email,
        ...basicInfoFormData,
      },
    });
  };

  const handleBack = () => {
    navigate("/web");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="main-container-11">
      <Sidebar />
      <main className="content-area1">
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

        <div>
          <h3>ADD NEW PROPERTY</h3>

          {/* Steps */}
          <div className="steps">
            <div className="step active">
              <span className="s11">1</span> Basic Info
            </div>
            <div className="step">
              <span className="s111">2</span> Property Detail
            </div>
            <div className="step">
              <span className="s111">3</span> General Info
            </div>
            <div className="step">
              <span className="s111">4</span> Location Info
            </div>
          </div>

          {/* Form */}
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label className="label1">Property Type</label>
                <select name="propertyType" value={basicInfoFormData.propertyType} onChange={handleChange}>
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label1">Negotiable</label>
                <select name="negotiable" value={basicInfoFormData.negotiable} onChange={handleChange}>
                  <option value="">Select Negotiable</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="maybe">Maybe</option>
                  <option value="conditional">Conditional</option>
                  <option value="not-set">Not Set</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label1">Price</label>
                <input
                  type="number"
                  name="price"
                  className="basic"
                  placeholder="Example: 10000"
                  value={basicInfoFormData.price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="label1">Ownership</label>
                <select name="ownership" value={basicInfoFormData.ownership} onChange={handleChange}>
                  <option value="">Select Ownership</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="joint">Joint Ownership</option>
                  <option value="cooperative">Cooperative</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label1">Property Age</label>
                <select name="propertyAge" value={basicInfoFormData.propertyAge} onChange={handleChange}>
                  <option value="">Select Property Age</option>
                  <option value="new">New</option>
                  <option value="1-5">1-5 Years</option>
                  <option value="5-10">5-10 Years</option>
                  <option value="10-20">10-20 Years</option>
                  <option value="over-20">Over 20 Years</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label1">Property Approved</label>
                <select
                  name="propertyApproved"
                  value={basicInfoFormData.propertyApproved}
                  onChange={handleChange}
                >
                  <option value="">Property Approved</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="pending">Pending</option>
                  <option value="not-applicable">Not Applicable</option>
                  <option value="under-review">Under Review</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label1">Property Description</label>
                <input
                  type="text"
                  name="propertyDescription"
                  
                  value={basicInfoFormData.propertyDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="label1">Bank Loan</label>
                <select name="bankLoan" value={basicInfoFormData.bankLoan} onChange={handleChange}>
                  <option value="">Bank Loan</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="pending">Pending</option>
                  <option value="available">Available</option>
                  <option value="not-required">Not Required</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button className="btn cancel" onClick={handleBack}>
                Cancel
              </button>
              <button className="btn save" onClick={handleNext}>
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BasicInfo;


