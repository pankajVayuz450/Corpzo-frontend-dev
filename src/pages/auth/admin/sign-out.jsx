import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const SignOut = () => {
  const { logout } = useAuth();

  console.log("loging out ");

  useEffect(() => {
    logout();
    console.log("log out success");
    
  }, [logout]);

  return null;
};

export default SignOut;
