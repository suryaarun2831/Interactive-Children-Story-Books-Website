import React, { useState } from 'react';
import { updateUserData } from '../API/Api';
import './InfoEdit.css';

const InfoEdit = ({ id, name, email, password, role, onEditClick }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedPassword, setUpdatedPassword] = useState(password);
  const [showPassword, setShowPassword] = useState(false);
  const [updatedRole, setUpdatedRole] = useState(role);

  const handleSaveClick = async () => {
    const userData = {
      id,
      name: updatedName,
      email: updatedEmail,
      password: updatedPassword,
      role: updatedRole,
    };
    try {
      await updateUserData(id, userData);
      onEditClick(userData); // Pass updated data back to parent
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="info-edit">
      <h2>Edit User Info</h2>
      <div className="edit-field">
        <label>Username</label>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </div>
      <div className="edit-field">
        <label>Email</label>
        <input
          type="email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </div>
      <div className="edit-field password-field">
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
        />
        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '👁️' : '🙈'}
        </button>
      </div>
      <div className="edit-btns">
        <button className="save-btn" onClick={handleSaveClick}>
          Save
        </button>
        <button className="cancel-btn" onClick={() => onEditClick(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InfoEdit;
