import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./generalinfo.css";
import Sidebar from "./Sidebar";

function Generalinfo() {
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure all fields from location.state (basicInfo + propertyData)
  const {
    userId = "N/A",
    userName = "Guest",
    email = "guest@example.com", // added fallback email for user dropdown
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
  } = location.state || {};

  // For image upload & form fields in General Info
  const [formData, setFormData] = useState({
    nameType: "",
    mobile: "",
    postedBy: "",
    saleType: "",
    featuredPackage: "",
    ppdPackage: "",
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const fileInputRef = useRef(null);

  // Clean up image preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Allow only digits and limit length to 10
      const onlyNums = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: onlyNums,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  const validateForm = () => {
    const { nameType, mobile, postedBy, saleType, featuredPackage, ppdPackage } = formData;
    if (!nameType || !mobile || !postedBy || !saleType || !featuredPackage || !ppdPackage) {
      alert("Please fill all required fields.");
      return false;
    }
    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }
    return true;
  };

  const goToNextPage = () => {
    if (!validateForm()) return;

    navigate("/locationinfo", {
      state: {
        userId,
        userName,
        email,
        // basicInfo fields
        propertyType,
        negotiable,
        price,
        ownership,
        propertyAge,
        propertyApproved,
        propertyDescription,
        bankLoan,
        // propertyData fields
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
        // generalInfo fields
        ...formData,
      },
    });
  };

  const goToPreviousPage = () => {
    navigate("/propertydetails", {
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
      },
    });
  };

  return (
    <div className="main-container-11">
      <Sidebar />

      {/* Main Content */}
      <div className="content-area1">
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
            <div className="step">
              <span className="s111">1</span> Basic Info
            </div>
            <div className="step">
              <span className="s111">2</span> Property Detail
            </div>
            <div className="step active">
              <span className="s11">3</span> General Info
            </div>
            <div className="step">
              <span className="s111">4</span> Location Info
            </div>
          </div>

          {/* Form Inside Box */}
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <select
                  name="nameType"
                  value={formData.nameType}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="owner">Owner</option>
                  <option value="builder">Builder</option>
                  <option value="dealer">Dealer</option>
                  <option value="agent">Agent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </div>

              <div className="form-group">
                <label>Posted by</label>
                <select
                  name="postedBy"
                  value={formData.postedBy}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="owner">Owner</option>
                  <option value="dealer">Dealer</option>
                  <option value="builder">Builder</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sale Type</label>
                <select
                  name="saleType"
                  value={formData.saleType}
                  onChange={handleInputChange}
                >
                  <option value="">Please Select</option>
                  <option value="new">New Booking</option>
                  <option value="resale">Resale</option>
                  <option value="rent">Rental</option>
                </select>
              </div>

              <div className="form-group">
                <label>Featured Package</label>
                <select
                  name="featuredPackage"
                  value={formData.featuredPackage}
                  onChange={handleInputChange}
                >
                  <option value="">Please Select</option>
                  <option value="silver">Silver Package</option>
                  <option value="gold">Gold Package</option>
                  <option value="platinum">Platinum Package</option>
                </select>
              </div>

              <div className="form-group">
                <label>PPD Package</label>
                <select
                  name="ppdPackage"
                  value={formData.ppdPackage}
                  onChange={handleInputChange}
                >
                  <option value="">Please Select</option>
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="photo-upload-wrapper" onClick={handleCameraClick}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <>
                    <div className="camera-circle">📷</div>
                    <div className="add-photo-text">Add Photo</div>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn previous" onClick={goToPreviousPage}>
                Previous
              </button>
              <button className="btn save" onClick={goToNextPage}>
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generalinfo;
