import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  // Navigate to Web.jsx page when "Property" is clicked
  const handlePropertyClick = () => {
    navigate("/web"); // Assuming "/web" is the route for Web.jsx
  };

  const handleAssistanceClick = () =>{
   return(
    <>
      assistance
    </>
   )
  }

  return (
    <aside className="layout-container">
      <div className="layout-sidebar">
      <h1 className="logo">Logo</h1>
      <nav className="nav-links">
 <div className="layout-side-options layout-selected">
  <i className="fas fa-home"></i> Property
</div>

        <div className="layout-side-options" onClick={handleAssistanceClick}>
          <i className="fas fa-bell"></i> Assistance
        </div>
        <div className="layout-side-options">
          <i className="fas fa-inbox"></i> Received Interest
        </div>
        <div className="layout-side-options">
          <i className="fas fa-paper-plane"></i> Sent Interest
        </div>
        <div className="layout-side-options">
          <i className="fas fa-eye"></i> Property Views
        </div>
        <div className="layout-side-options">
          <i className="fas fa-tags"></i> Tariff Plan
        </div>
      </nav>
      </div>
    </aside>
  );
}


export default Sidebar;