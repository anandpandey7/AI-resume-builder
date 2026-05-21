import { logout, removeUserInfo, getUserInfo } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

export default function NavbarExample() {
  const navigate = useNavigate();
  const user = getUserInfo();

  const handleLogout = async () => {
    await logout();
    removeUserInfo();
    navigate('/signin');
  };

  if (!user) {
    return (
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <a href="/">Home</a>
      <div className="user-section">
        <span>Welcome, {user.firstName} {user.lastName}</span>
        <span>({user.email})</span>
        <a href="/resume-generator">Generate Resume</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
