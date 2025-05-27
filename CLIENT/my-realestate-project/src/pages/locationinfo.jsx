import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./locationinfo.css";
import Sidebar from "./Sidebar";

function Locationinfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Destructure all fields from location.state with defaults
  const {
    userId = "N/A",
    userName = "Guest",
    // basicInfo fields
    propertyType = "",
    negotiable = "",
    price = "",
    ownership = "",
    propertyAge = "",
    propertyApproved = "",
    propertyDescription = "",
    bankLoan = "",
    // propertyData fields
    length = "",
    breadth = "",
    totalArea = "",
    areaUnit = "",
    bhk = "",
    floor = "",
    attached = "",
    westernToilet = "",
    furnished = "",
    carParking = "",
    lift = "",
    electricity = "",
    facing = "",
    // generalInfo fields
    nameType = "",
    mobile = "",
    postedBy = "",
    saleType = "",
    featuredPackage = "",
    ppdPackage = "",
    imageFile = null,
  } = location.state || {};

  // Initialize state for locationInfo
  const [locationInfo, setLocationInfo] = useState({
    email: "",
    city: "",
    area: "",
    pincode: "",
    address: "",
    landmark: "",
    latitude: "",
    longitude: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const goNext = async () => {
    const requiredFields = ["email", "city", "address", "pincode"];
    for (const field of requiredFields) {
      if (!locationInfo[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    if (!propertyType || !length || !nameType) {
      alert(
        "Critical data from previous steps is missing. Please go back and fill all required fields."
      );
      return;
    }

    const reqBody = {
      userId,
      userName,
      propertyType,
      negotiable,
      price,
      ownership,
      propertyAge,
      propertyApproved,
      propertyDescription,
      bankLoan,
      length,
      breadth,
      totalArea,
      areaUnit,
      bhk,
      floor,
      attached,
      westernToilet,
      furnished,
      carParking,
      lift,
      electricity,
      facing,
      nameType,
      mobile,
      postedBy,
      saleType,
      featuredPackage,
      ppdPackage,
      email: locationInfo.email,
      city: locationInfo.city,
      area: locationInfo.area,
      pincode: locationInfo.pincode,
      address: locationInfo.address,
      landmark: locationInfo.landmark,
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(reqBody));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("http://localhost:5000/api/properties/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add property: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      alert("Property added successfully!");
      navigate("/web", {
        state: { userId, userName },
      });
    } catch (error) {
      alert("Error adding property: " + error.message);
    }
  };

  // Handle back navigation
  const goBack = () => {
    navigate("/generalinfo", {
      state: {
        userId,
        userName,
        propertyType,
        negotiable,
        price,
        ownership,
        propertyAge,
        propertyApproved,
        propertyDescription,
        bankLoan,
        length,
        breadth,
        totalArea,
        areaUnit,
        bhk,
        floor,
        attached,
        westernToilet,
        furnished,
        carParking,
        lift,
        electricity,
        facing,
        nameType,
        mobile,
        postedBy,
        saleType,
        featuredPackage,
        ppdPackage,
        imageFile,
        ...locationInfo,
      },
    });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Safely get user email prefix for dropdown display
  const emailPrefix = locationInfo.email ? locationInfo.email.split("@")[0] : "User";

  return (
    <div className="main-container-11">
      <Sidebar />
      <main className="content-area1">
        <div className="webdash-top">
          <p className="p1">USER ID : {userId}</p>
          <div className="user-dropdown-wrapper">
            <p className="p2" style={{ cursor: "pointer" }}>
              👤 {emailPrefix}
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
            <div className="step">
              <span className="s111">1</span> Basic Info
            </div>
            <div className="step">
              <span className="s111">2</span> Property Detail
            </div>
            <div className="step">
              <span className="s111">3</span> General Info
            </div>
            <div className="step active">
              <span className="s11">4</span> Location Info
            </div>
          </div>

          {/* Form Section */}
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={locationInfo.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <select
                  name="city"
                  value={locationInfo.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              <div className="form-group">
                <label>Area</label>
                <select
                  name="area"
                  value={locationInfo.area}
                  onChange={handleChange}
                >
                  <option value="">Select Area</option>
                  <option value="Madhapur">Madhapur</option>
                  <option value="Kondapur">Kondapur</option>
                  <option value="Jubilee Hills">Jubilee Hills</option>
                  <option value="Begumpet">Begumpet</option>
                  <option value="Gachibowli">Gachibowli</option>
                </select>
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <select
                  name="pincode"
                  value={locationInfo.pincode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Pincode</option>
                  <option value="500081">500081</option>
                  <option value="560001">560001</option>
                  <option value="400001">400001</option>
                  <option value="600001">600001</option>
                  <option value="110001">110001</option>
                </select>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={locationInfo.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Landmark</label>
                <input
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  value={locationInfo.landmark}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="text"
                  placeholder="Latitude"
                  name="latitude"
                  value={locationInfo.latitude}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="text"
                  placeholder="Longitude"
                  name="longitude"
                  value={locationInfo.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn previous" onClick={goBack}>
                Previous
              </button>
              <button className="btn add" onClick={goNext}>
                Add Property
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Locationinfo;
