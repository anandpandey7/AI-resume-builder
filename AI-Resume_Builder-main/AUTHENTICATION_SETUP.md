# Authentication & Authorization Implementation Guide

## Overview
This implementation uses **JWT (JSON Web Tokens)** with **HTTP-only Cookies** for secure authentication in your AI Resume Builder application.

---

## Backend Setup (Completed ✓)

### 1. **Dependencies Added**
- Spring Security
- Spring Data JPA
- JWT (jjwt)
- BCrypt password encoding

### 2. **Key Components Created**

#### **Entities**
- `User.java` - User model with roles
- `Role.java` - Role model for authorization

#### **Services**
- `AuthService.java` - Authentication logic (signup, login)
- `CustomUserDetailsService.java` - User details provider for Spring Security

#### **Utilities**
- `JwtUtil.java` - JWT token generation and validation

#### **Filters**
- `JwtAuthenticationFilter.java` - Intercepts requests and validates JWT

#### **Configuration**
- `SecurityConfig.java` - Spring Security configuration

#### **Controllers**
- `AuthController.java` - Auth endpoints (signup, login, logout)

#### **DTOs**
- `LoginRequest.java` - Login request payload
- `SignupRequest.java` - Signup request payload
- `AuthResponse.java` - Auth response payload

---

## Backend Configuration

### Update `application.properties`
The database configuration has been updated. You need to:

```properties
# Update these with your database credentials
spring.datasource.url=jdbc:mysql://localhost:3306/resume_builder
spring.datasource.username=root
spring.datasource.password=your-password

# JWT settings (change in production)
jwt.secret=your-super-secret-key-at-least-32-characters-long
jwt.expiration=86400000  # 24 hours
```

### Database Setup
```sql
-- Create database
CREATE DATABASE resume_builder;
USE resume_builder;

-- Tables will be created automatically by JPA (ddl-auto=update)
```

---

## Backend API Endpoints

### **Authentication Endpoints**

#### 1. **Signup** (Register New User)
```
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

Response (Success):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "success": true,
  "message": "User registered successfully"
}

Headers Returned:
Set-Cookie: jwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400
```

#### 2. **Login**
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (Success):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "success": true,
  "message": "Login successful"
}

Headers Returned:
Set-Cookie: jwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400
```

#### 3. **Logout**
```
POST /api/v1/auth/logout

Response:
"Logout successful"

Headers Returned:
Set-Cookie: jwtToken=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0
```

#### 4. **Verify Token**
```
GET /api/v1/auth/verify
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Token is valid"
}
```

### **Protected Endpoints**

#### **Generate Resume** (Requires Authentication)
```
POST /api/v1/resume/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "userDescription": "..."
}

Response:
{
  "resume": {...}
}
```

---

## Frontend Setup

### 1. **Install Required Dependencies**
```bash
npm install axios
```

### 2. **AuthService Usage in Frontend**

#### **Signup Example**
```javascript
import { signup, saveUserInfo } from './api/AuthService';

const handleSignup = async () => {
  const result = await signup({
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  });

  if (result.success) {
    saveUserInfo(result);
    // Redirect to home or dashboard
  } else {
    console.log('Signup failed:', result.message);
  }
};
```

#### **Login Example**
```javascript
import { login, saveUserInfo } from './api/AuthService';

const handleLogin = async () => {
  const result = await login(
    'user@example.com',
    'password123'
  );

  if (result.success) {
    saveUserInfo(result);
    // Redirect to resume generator
  } else {
    console.log('Login error:', result.message);
  }
};
```

#### **Logout Example**
```javascript
import { logout, removeUserInfo } from './api/AuthService';

const handleLogout = async () => {
  await logout();
  removeUserInfo();
  // Redirect to login
};
```

#### **Protected Route Check**
```javascript
import { isAuthenticated, getToken } from './api/AuthService';

if (!isAuthenticated()) {
  // Redirect to login
}
```

### 3. **Update Your React Components**

#### **Example: Signin Component Update**
```jsx
import { login, saveUserInfo } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      saveUserInfo(result);
      navigate('/resume-generator');
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

#### **Example: Protected Route Component**
```jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/AuthService';

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
}

// Usage
<ProtectedRoute>
  <GenerateResume />
</ProtectedRoute>
```

#### **Example: Navbar with Logout**
```jsx
import { logout, removeUserInfo, getUserInfo } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUserInfo();

  const handleLogout = async () => {
    await logout();
    removeUserInfo();
    navigate('/signin');
  };

  return (
    <nav>
      {user && (
        <>
          <span>Welcome, {user.firstName}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
```

---

## How Authentication Flow Works

### **Cookie-Based Authentication Flow**

1. **User Signup/Login**
   - Frontend sends credentials to backend
   - Backend validates and generates JWT token
   - Backend sets JWT in HTTP-only cookie via `Set-Cookie` header
   - Frontend also stores token in localStorage for later use

2. **Subsequent Requests**
   - Frontend automatically sends token in requests (via interceptor)
   - Browser automatically sends cookie with requests (if withCredentials: true)
   - Backend validates token using JwtAuthenticationFilter
   - If valid, user is authenticated for that request

3. **Logout**
   - Backend clears the cookie
   - Frontend removes token from localStorage

---

## Security Features Implemented

✓ **Password Encryption** - Using BCrypt (strength: 10)
✓ **JWT Token** - Signed with HMAC SHA-256
✓ **HTTP-only Cookie** - Cannot be accessed via JavaScript (XSS protection)
✓ **Secure Flag** - Cookie only sent over HTTPS in production
✓ **SameSite=Lax** - CSRF protection
✓ **CORS Configuration** - Properly configured for frontend
✓ **Role-Based Access Control** - Ready for authorization
✓ **Token Expiration** - 24 hours default

---

## Production Checklist

Before deploying to production:

- [ ] Change `jwt.secret` to a strong random key (minimum 32 characters)
- [ ] Set `jwt.expiration` appropriately (recommended: 1 hour for access token)
- [ ] Update CORS allowed origins (remove * and localhost)
- [ ] Use environment variables for sensitive data
- [ ] Enable SSL/TLS (HTTPS)
- [ ] Test with real HTTPS URLs
- [ ] Implement refresh token mechanism (optional but recommended)
- [ ] Add rate limiting on auth endpoints
- [ ] Add logging for security events

---

## Troubleshooting

### **"Invalid email or password" on login**
- Verify user exists in database
- Check password is correct
- Ensure MySQL is running

### **CORS errors**
- Update `SecurityConfig.java` allowed origins
- Ensure `withCredentials: true` in frontend axios

### **JWT token not being sent**
- Check `Authorization` header in network tab
- Verify localStorage has the token
- Check if axios interceptor is working

### **Cookie not being set**
- In development with HTTP: Use `SameSite=Lax` (already configured)
- In production: Use HTTPS with `Secure` flag
- Check browser cookie settings

### **401 Unauthorized on protected endpoints**
- Verify JWT token is valid
- Check if token is expired
- Ensure token is sent in Authorization header or cookie

---

## Next Steps

1. Test the backend endpoints using Postman
2. Update your React components to use AuthService
3. Create login and signup pages
4. Add protected routes
5. Test the complete flow
6. Deploy to production with updated JWT secret

For any issues or questions, refer to the Spring Security documentation: https://spring.io/projects/spring-security
