import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteUser, getUsersData, updateUserData } from '../API/Api';
import { MyContext } from '../context/Context';
import './User.css';

const User = () => {
  const theme = localStorage.getItem('theme');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useContext(MyContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersData();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      console.log('Delete Request :' + id);
      await DeleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSave = async (id, name, email, password, role) => {
    try {
      const userData = {
        id,
        name,  // Use 'name' instead of 'username'
        email,
        password,
        role
      };
      await updateUserData(id, userData);
      setUsers(users.map(user => (user.id === id ? { ...user, ...userData } : user)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={`user-management ${theme}`}>
      <h2 className={`users-list ${theme}`}>User Management</h2>
      <div className='user-table'>
        <div className='user-table-header'>
          <div className='serial-no'>#</div>
          <div className='user-info'>Username</div>
          <div className='user-info '>User Type</div>
          <div className='actions'>Actions</div>
        </div>
        {users.map((user, index) => (
          <div className='user-row' key={user.id}>
            <div className='serial-no'>{index + 1}</div>
            <div className='user-info'>{user.name}</div>
            <div className='user-info'>{user.role}</div>
            <div className='actions'>
              <button onClick={() => handleEditClick(user)} className='user-edit-btn'>Edit</button>
              <button onClick={() => handleDeleteClick(user.id)} className='delete-btn'>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showEditModal && editingUser && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>Edit User</h3>
            <label>
              Username:
              <input
                type='text'
                value={editingUser.name}  // Use 'name' here as well
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type='password'
                value={editingUser.password}
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              />
            </label>
            <button onClick={() => handleSave(editingUser.id, editingUser.name, editingUser.email, editingUser.password, editingUser.role)} className='save-btn'>Save</button>
            <button onClick={() => setShowEditModal(false)} className='cancel-btn'>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
