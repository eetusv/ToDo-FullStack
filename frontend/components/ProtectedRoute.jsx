import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    alert('You must be logged in');
    return <Navigate to="/login" />;
  }

  return children;
}
