// Popup.js
import React from 'react';
import './App.css'; // Make sure to add your styles here

// Reusable Popup Component
const Popup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // If the popup is not open, render nothing

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        
        {title && <h3>{title}</h3>}  {/* Optionally render the title */}
        
        {children}  {/* Render the content passed as children */}
      </div>
    </div>
  );
};

export default Popup;
