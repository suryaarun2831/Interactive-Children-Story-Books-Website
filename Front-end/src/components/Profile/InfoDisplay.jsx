import React from 'react';
import './InfoDisplay.css';
const InfoDisplay = ({ username, email, role, onEditClick }) => {
  return (
    <div className="info-display">
      <h2>User Information</h2>
      <div className="info-field">
        <span className="info-label">Username:</span> 
        <span className="info-value">{username}</span>
      </div>
      <div className="info-field">
        <span className="info-label">Email:</span> 
        <span className="info-value">{email}</span>
      </div>
      <div className="info-field">
        <span className="info-label">Role:</span> 
        <span className="info-value">{role}</span>
      </div>
      <button className="edit-btn" onClick={onEditClick}>Edit</button>
    </div>
  );
};

export default InfoDisplay;
