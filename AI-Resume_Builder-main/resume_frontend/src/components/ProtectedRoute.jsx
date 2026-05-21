import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
        <div className="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="card-title text-2xl font-bold mb-2">Authentication Required</h2>
            <p className="text-base-content/70 mb-6">
              You need to be logged in to access this feature. Please sign in or create an account to continue.
            </p>
            <div className="card-actions justify-center w-full flex-col sm:flex-row gap-3">
              <button 
                className="btn btn-primary w-full sm:w-auto px-8 rounded-full"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </button>
              <button 
                className="btn btn-outline w-full sm:w-auto px-8 rounded-full"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
