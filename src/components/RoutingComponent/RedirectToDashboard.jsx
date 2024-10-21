import { Navigate } from 'react-router-dom';

const RedirectToDashboard = () => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/auth/sign-in" />;
  }
  if (role === 'admin') {
    return <Navigate to="/dashboard/masterSettings/Category" />;
  } else {
    return <Navigate to="/dashboard/user/home" />;
  }
};
export default RedirectToDashboard;