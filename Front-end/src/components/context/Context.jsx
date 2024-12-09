import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [loginId, setLoginId] = useState(null);
  const [loginstatus, setLoginStatus] = useState(false);
  const [storyname, setStoryname] = useState('');
  const [userRole, setuserRole] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === true;
    const storedLoginId = localStorage.getItem('loginId');
    const storedUserRole = localStorage.getItem('userRole');

    if (isLoggedIn && storedLoginId && storedUserRole) {
      setLoginStatus(true);
      setLoginId(storedLoginId);
      setuserRole(storedUserRole);
    }
  }, []);

  return (
    <MyContext.Provider value={{ loginstatus, setLoginStatus, storyname, setStoryname, userRole, setuserRole, loginId, setLoginId }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
