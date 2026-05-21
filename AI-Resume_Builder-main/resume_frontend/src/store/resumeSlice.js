import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedResumes: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setSavedResumes: (state, action) => {
      state.savedResumes = action.payload;
    },
    addSavedResume: (state, action) => {
      state.savedResumes.unshift(action.payload);
    },
    clearResumes: (state) => {
      state.savedResumes = [];
    },
  },
});

export const { setSavedResumes, addSavedResume, clearResumes } = resumeSlice.actions;

export default resumeSlice.reducer;
