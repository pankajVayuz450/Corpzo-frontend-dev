import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const isLoggedIn = () => {
  return localStorage.getItem('authToken') !== null;
};

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handleStorageChange = () => {
      if (!isLoggedIn()) {
        setLoggedIn(false);
      }
    };

    // Listen for storage changes (i.e., token removal in another tab)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!loggedIn) {
    return <Navigate to="/auth/sign-in" />;
  }

  const userRole = getUserRole();

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
