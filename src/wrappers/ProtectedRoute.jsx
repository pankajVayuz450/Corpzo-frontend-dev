import React from 'react';
import { Navigate } from 'react-router-dom';

const isLoggedIn = () => {
  return localStorage.getItem('authToken') !== null;
};

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

const ProtectedRoute = ({ children, requiredRole }) => {
  console.log("ProtectedRoute");
  
  const loggedIn = isLoggedIn();
  const userRole = getUserRole();

  if (!loggedIn) {
    console.log("Already logged in");
    
    return <Navigate to="/auth/sign-in" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
