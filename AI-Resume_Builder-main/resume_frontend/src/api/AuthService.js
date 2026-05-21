import axios from "axios";

const baseURL = "http://localhost:8080";

const authAxios = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable sending cookies along with requests
});

// Save token to localStorage when received
export const saveToken = (token) => {
    if (token) {
        localStorage.setItem('jwtToken', token);
    }
};

// Get token from localStorage
export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

// Remove token from localStorage
export const removeToken = () => {
    localStorage.removeItem('jwtToken');
};

// Signup user
export const signup = async (signupData) => {
    try {
        const response = await authAxios.post('/api/v1/auth/signup', {
            email: signupData.email,
            password: signupData.password,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
        });

        if (response.data.token) {
            saveToken(response.data.token);
        }

        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Signup failed',
        };
    }
};

// Login user
export const login = async (email, password) => {
    try {
        const response = await authAxios.post('/api/v1/auth/login', {
            email,
            password,
        });

        if (response.data.token) {
            saveToken(response.data.token);
        }

        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed',
        };
    }
};

// Logout user
export const logout = async () => {
    try {
        await authAxios.post('/api/v1/auth/logout');
        removeToken();
        return { success: true, message: 'Logout successful' };
    } catch (error) {
        removeToken(); // Remove token anyway
        return { success: true, message: 'Logout successful' };
    }
};

// Verify token
export const verifyToken = async () => {
    try {
        const token = getToken();
        if (!token) {
            return { success: false, message: 'No token found' };
        }

        const response = await authAxios.get('/api/v1/auth/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        removeToken();
        return { success: false, message: 'Token verification failed' };
    }
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

// Get user from localStorage
export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

// Save user info to localStorage
export const saveUserInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

// Remove user info from localStorage
export const removeUserInfo = () => {
    localStorage.removeItem('userInfo');
};
