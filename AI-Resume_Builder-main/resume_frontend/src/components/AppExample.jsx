import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import NavbarExample from './components/NavbarExample';
import LoginExample from './components/LoginExample';
import SignupExample from './components/SignupExample';
import GenerateResume from './pages/GenerateResume';
import Home from './pages/Home';

/**
 * Example App.jsx with Authentication
 * 
 * Key features:
 * - Public routes (Home, Login, Signup)
 * - Protected routes (GenerateResume)
 * - Navbar with user info and logout
 */
export default function App() {
  return (
    <Router>
      <NavbarExample />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginExample />} />
        <Route path="/signup" element={<SignupExample />} />

        {/* Protected Routes */}
        <Route
          path="/resume-generator"
          element={
            <ProtectedRoute>
              <GenerateResume />
            </ProtectedRoute>
          }
        />

        {/* Add other protected routes here */}
      </Routes>
    </Router>
  );
}
