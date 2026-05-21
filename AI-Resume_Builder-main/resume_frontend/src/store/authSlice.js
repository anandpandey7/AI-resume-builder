import { createSlice } from '@reduxjs/toolkit';

let initialUser = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    initialUser = JSON.parse(storedUser);
  }
} catch (e) {
  console.error("Could not parse user from localStorage", e);
}

const initialState = {
  user: initialUser, // { email, firstName, lastName }
  token: localStorage.getItem('jwtToken') || null,
  isAuthenticated: !!localStorage.getItem('jwtToken') && !!initialUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email, firstName, lastName } = action.payload;
      const userObj = { email, firstName, lastName };
      state.user = userObj;
      state.token = token;
      state.isAuthenticated = true;
      if (token) {
        localStorage.setItem('jwtToken', token);
      }
      localStorage.setItem('user', JSON.stringify(userObj));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
