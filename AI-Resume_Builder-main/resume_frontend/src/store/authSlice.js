import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // { email, firstName, lastName }
  token: localStorage.getItem('jwtToken') || null,
  isAuthenticated: !!localStorage.getItem('jwtToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email, firstName, lastName } = action.payload;
      state.user = { email, firstName, lastName };
      state.token = token;
      state.isAuthenticated = true;
      if (token) {
        localStorage.setItem('jwtToken', token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwtToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
