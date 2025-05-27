import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./propertydetails.css";
import Sidebar from "./Sidebar";

function Propertydetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

  const {
    userId = "N/A",
    userName = "Guest",
    email = "guest@example.com",
    propertyType = "",
    negotiable = "",
    price = "",
    ownership = "",
    propertyAge = "",
    propertyApproved = "",
    propertyDescription = "",
    bankLoan = "",
  } = location.state || {};

  const [propertyFormData, setPropertyFormData] = useState({
    length: "",
    breadth: "",
    totalArea: "",
    areaUnit: "",
    bhk: "",
    floor: "",
    attached: "",
    westernToilet: "",
    furnished: "",
    carParking: "",
    lift: "",
    electricity: "",
    facing: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  const Next = () => {
    const isEmpty = Object.values(propertyFormData).some((value) => value.trim() === "");
    if (isEmpty) {
      alert("Please fill out all fields before continuing.");
      return;
    }

    navigate("/generalinfo", {
      state: {
        userId,
        userName,
        email,
        propertyType,
        negotiable,
        price,
        ownership,
        propertyAge,
        propertyApproved,
        propertyDescription,
        bankLoan,
        ...propertyFormData,
      },
    });
  };

  const Before = () => {
    navigate("/basicinfo", {
      state: { userId, userName, email },
    });
  };

  return (
    <div className="main-container-11">
      <Sidebar />
      <main className="content-area1">
        <div className="webdash-top">
          <p className="p1">USER ID : {userId}</p>
          <div className="user-dropdown-wrapper">
            <p
              className="p2"
              onClick={() => setShowDropdown((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              👤 {email.split("@")[0]}
              <i className="fas fa-chevron-down" style={{ fontSize: "12px", marginLeft: "3px" }}></i>
            </p>
            {showDropdown && (
              <div className="logout-dropdown">
                <button onClick={handleLogout} className="logout">Logout</button>
              </div>
            )}
          </div>
        </div>

        <hr style={{ color: "#E1F9F4" }} />
        <div>
          <h3>ADD NEW PROPERTY</h3>

          <div className="steps">
            <div className="step"><span className="s111">1</span> Basic Info</div>
            <div className="step active"><span className="s11">2</span> Property Detail</div>
            <div className="step"><span className="s111">3</span> General Info</div>
            <div className="step"><span className="s111">4</span> Location Info</div>
          </div>

          <div className="form-container">
            <div className="form-row">
              {/* Text Inputs */}
              {[
                { label: "Length", name: "length", placeholder: "Example: 1000" },
                { label: "Breadth", name: "breadth", placeholder: "Example: 1000" },
                { label: "Total Area", name: "totalArea", placeholder: "Example: 7500" },
                { label: "Electricity", name: "electricity", placeholder: "Example: 3 phase" },
              ].map(({ label, name, placeholder }) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={propertyFormData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              {/* Select Inputs */}
              {[
                { label: "Area Unit", name: "areaUnit", options: ["Square Feet", "Square Yards", "Square Meters", "Acres", "Hectares"] },
                { label: "No of BHK", name: "bhk", options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"] },
                { label: "No of Floor", name: "floor", options: ["Ground", "1", "2", "3", "4+"] },
                { label: "Attached", name: "attached", options: ["Yes", "No", "1 Bathroom Attached", "All Bathrooms Attached", "Partial"] },
                { label: "Western Toilet", name: "westernToilet", options: ["Yes", "No", "One Only", "All", "Mix of Indian and Western"] },
                { label: "Furnished", name: "furnished", options: ["Unfurnished", "Semi-Furnished", "Fully Furnished", "Only Kitchen Furnished", "Furnished with Appliances"] },
                { label: "Car Parking", name: "carParking", options: ["No Parking", "1 Car", "2 Cars", "Basement Parking", "Open Parking"] },
                { label: "Lift", name: "lift", options: ["No", "Yes - Manual", "Yes - Automatic", "Available for All Floors", "Private Lift"] },
                { label: "Facing", name: "facing", options: ["East", "West", "North", "South", "North-East"] },
              ].map(({ label, name, options }) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <select name={name} value={propertyFormData[name]} onChange={handleChange}>
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button className="btn previous" onClick={Before}>Previous</button>
              <button className="btn save" onClick={Next}>Save & Continue</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Propertydetails;
