import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/student'} replace />;
  }
  return children;
};