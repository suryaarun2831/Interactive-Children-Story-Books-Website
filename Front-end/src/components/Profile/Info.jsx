// Info.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersData, updateUserData } from '../API/Api';
import { MyContext } from '../context/Context';
import InfoDisplay from './InfoDisplay';
import InfoEdit from './InfoEdit';

const Info = ({id}) => {
  const navigate = useNavigate();
  const { setuserRole, setLoginStatus, setLoginId } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const storedLoginId = localStorage.getItem('loginId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (storedLoginId) {
        try {
          const res = await getUsersData();
          const user = res.data.find(user => user.id === parseInt(storedLoginId));
          if (user) {
            setUsername(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setRole(user.role);
          } else {
            console.log("User not found for loginId:", storedLoginId);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User Not Found");
      }
    };
    fetchUserData();
  }, [storedLoginId]);

  const handleSaveClick = async () => {
    if (storedLoginId) {
      try {
        const userData = {
          username,
          email,
          password,
          role
        };
        await updateUserData(parseInt(storedLoginId), userData);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };
  

  const handleLogoutClick = () => {
    setLoginStatus(false);
    setLoginId(null);
    setuserRole('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginId');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className='info-container'>
      {isEditing ? (
        <InfoEdit 
        id={parseInt(storedLoginId)}
        name={username}
          email={email}
          password={password}
          role={role}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setRole={setRole}
          onSaveClick={handleSaveClick}
          onEditClick={() => setIsEditing(false)}
          />
        ) : (
          <InfoDisplay
          username={username}
          email={email}
          role={role}
          onEditClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default Info;
