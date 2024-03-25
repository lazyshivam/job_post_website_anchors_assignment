import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('loggedIn') === 'true', // Check local storage for initial state
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null, // Parse and set initial user data
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      localStorage.setItem('loggedIn', true);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('loggedIn');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
