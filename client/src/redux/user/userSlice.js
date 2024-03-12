import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    logInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logInStart, logInSuccess, logInError , setCurrentUser , updateUserError, updateUserStart ,updateUserSuccess } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
