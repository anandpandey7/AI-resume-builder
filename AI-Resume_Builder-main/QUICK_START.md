# Quick Start Guide - Authentication Implementation

## Prerequisites
- Java 17+ installed
- MySQL installed and running
- Node.js installed
- VS Code or IntelliJ IDEA

---

## Backend Setup (Java/Spring Boot)

### Step 1: Database Setup
```sql
-- Open MySQL and run:
CREATE DATABASE resume_builder;
USE resume_builder;
-- Tables will be created automatically
```

### Step 2: Configure Database Connection
Edit `resume-ai-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_builder
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

### Step 3: Set JWT Secret (Important!)
Edit `application.properties`:
```properties
jwt.secret=your-super-secret-key-that-is-at-least-32-characters-long
jwt.expiration=86400000
```

### Step 4: Build and Run Backend
```bash
cd resume-ai-backend

# Build with Maven
./mvnw clean build

# Run the application
./mvnw spring-boot:run

# Or import in IDE and run ResumeAiBackendApplication.java
```

**Backend should be running on:** `http://localhost:8080`

---

## Frontend Setup (React/Vite)

### Step 1: Install Dependencies
```bash
cd resume_frontend
npm install
```

### Step 2: Update API Endpoint (if needed)
`src/api/ResumeService.js` already points to `http://localhost:8080`

### Step 3: Update Components
Copy the example components:
- `src/components/LoginExample.jsx` → Your login page
- `src/components/SignupExample.jsx` → Your signup page
- `src/components/ProtectedRoute.jsx` → Wrap protected pages
- `src/api/AuthService.js` → Use in your components

### Step 4: Run Frontend
```bash
npm run dev
```

**Frontend will be running on:** `http://localhost:5173`

---

## Testing the Flow

### 1. Test Signup (Postman or Browser)
```
POST http://localhost:8080/api/v1/auth/signup
Body (JSON):
{
  "email": "test@example.com",
  "password": "Test123456",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "success": true,
  "message": "User registered successfully"
}
```

### 2. Test Login
```
POST http://localhost:8080/api/v1/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "Test123456"
}
```

### 3. Test Protected Endpoint
```
POST http://localhost:8080/api/v1/resume/generate
Headers:
Authorization: Bearer <token_from_login>
Body (JSON):
{
  "userDescription": "Test description"
}
```

### 4. Test Logout
```
POST http://localhost:8080/api/v1/auth/logout
```

---

## Frontend Component Implementation

### Update your Signin.jsx:
```jsx
import { login, saveUserInfo } from '../api/AuthService';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      saveUserInfo(result);
      navigate('/'); // Go to home or dashboard
    } else {
      alert(result.message);
    }
  };

  return (
    // Your form JSX
  );
}
```

### Update your Signup.jsx:
```jsx
import { signup, saveUserInfo } from '../api/AuthService';

export default function Signup() {
  const handleSignup = async (formData) => {
    const result = await signup(formData);
    
    if (result.success) {
      saveUserInfo(result);
      navigate('/');
    }
  };

  return (
    // Your form JSX
  );
}
```

### Protect Routes in App.jsx:
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Routes>
  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route
    path="/resume-generator"
    element={
      <ProtectedRoute>
        <GenerateResume />
      </ProtectedRoute>
    }
  />
</Routes>
```

### Use Token in API Calls:
The `ResumeService.js` already includes interceptor that adds token automatically:

```jsx
import { generateResume } from '../api/ResumeService';

const handleGenerate = async (description) => {
  const result = await generateResume(description);
  // Token is automatically added to Authorization header
};
```

---

## Common Issues & Solutions

### Issue: "CORS error" or "Cannot POST /api/v1/auth/signup"
**Solution:** Make sure backend is running on port 8080 and frontend is on 5173

### Issue: "401 Unauthorized"
**Solution:** 
- Token is not being sent in headers
- Token has expired
- Token is invalid

Check browser Network tab → see Authorization header

### Issue: "Database error" or "Cannot connect to MySQL"
**Solution:**
- Check MySQL is running
- Verify credentials in application.properties
- Ensure database exists

### Issue: "Cookies not being set"
**Solution:**
- In development, use `http://` (not https)
- Enable `withCredentials: true` in axios (already done in ResumeService.js)

---

## File Structure Created

```
resume-ai-backend/
├── src/main/java/com/resume/backend/
│   ├── entity/
│   │   ├── User.java
│   │   └── Role.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   └── RoleRepository.java
│   ├── service/
│   │   ├── AuthService.java
│   │   └── CustomUserDetailsService.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── ResumeController.java
│   ├── filter/
│   │   └── JwtAuthenticationFilter.java
│   ├── config/
│   │   └── SecurityConfig.java
│   ├── util/
│   │   └── JwtUtil.java
│   └── dto/
│       ├── LoginRequest.java
│       ├── SignupRequest.java
│       └── AuthResponse.java
└── pom.xml (updated with dependencies)

resume_frontend/
├── src/
│   ├── api/
│   │   ├── ResumeService.js (updated)
│   │   └── AuthService.js (new)
│   └── components/
│       ├── LoginExample.jsx (new)
│       ├── SignupExample.jsx (new)
│       ├── ProtectedRoute.jsx (new)
│       ├── NavbarExample.jsx (new)
│       └── AppExample.jsx (new)
```

---

## Next Steps

1. ✅ Backend is ready with all auth endpoints
2. ✅ Frontend AuthService is created
3. 📋 **TODO:** Update your React components to use AuthService
4. 📋 **TODO:** Add login/signup pages using the examples
5. 📋 **TODO:** Protect routes using ProtectedRoute
6. 📋 **TODO:** Update Navbar to show user info
7. 📋 **TODO:** Test complete flow end-to-end
8. 📋 **TODO:** Deploy to production with environment variables

---

## Security Reminders

⚠️ **Before Deploying to Production:**
- Change `jwt.secret` to a strong random value
- Update CORS allowed origins (remove localhost)
- Remove console.log statements
- Enable HTTPS/SSL
- Use environment variables for sensitive data
- Set up rate limiting
- Enable HTTPS Secure Cookie flag

---

For detailed documentation, see: [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md)
