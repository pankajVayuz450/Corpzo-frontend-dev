import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRoleState] = useState(localStorage.getItem('userRole'));
  const [token, setTokenState] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("why are you running")
    setRoleState(localStorage.getItem('userRole'));
    setTokenState(localStorage.getItem('authToken'));
  }, []);

  // const login = (role, token) => {
  //   setRoleState(role);
  //   setTokenState(token);
  //   localStorage.setItem('userRole', role);
  //   localStorage.setItem('authToken', token);
    
  //   if (role === 'admin') {
  //     console.log("admin hook navigate ")
  //     navigate('/dashboard/admin/home');
  //   } else {
  //     console.log("user hook navigate ")
  //     navigate('/dashboard/user/home');
  //   }
  // };

  // const logout = () => {
  //   setRoleState(null);
  //   setTokenState(null);
  //   localStorage.removeItem('userRole');
  //   localStorage.removeItem('authToken');
  //   navigate('/auth/sign-in');
  // };

  return (
    <AuthContext.Provider value={{ role, token,  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
