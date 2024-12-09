import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from '../context/Context';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userRole } = useContext(MyContext);
    const loginstatus=localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');

  if (!loginstatus) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(storedUserRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return element;
};

export default ProtectedRoute;
