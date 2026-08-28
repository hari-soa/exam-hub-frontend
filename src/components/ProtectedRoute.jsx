import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getHomePath(role) {
  return role === 'admin' ? '/admin' : '/student';
}

export default function ProtectedRoute({ role, children }) {
  const { user, role: userRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={getHomePath(userRole)} replace />;
  }

  return children;
}