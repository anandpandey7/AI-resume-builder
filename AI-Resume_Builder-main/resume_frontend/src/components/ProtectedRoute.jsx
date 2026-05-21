import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/AuthService';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * 
 * Usage:
 * <ProtectedRoute>
 *   <SomeProtectedComponent />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
