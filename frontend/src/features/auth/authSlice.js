import { createSlice } from "@reduxjs/toolkit";

// The initial state
const initialState = {
  role: null,
  logout: false,
  isLoggedIn: false,
  previousPage: "/",
};

// Main slice Dispatch functions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeRole(state, action) {
      state.role = action.payload;
    },
    showLogout(state, action) {
      state.showLogout = action.payload;
    },
    changeIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setPreviousPage(state, action) {
      state.previousPage = action.payload;
    },
  },
});

// Main slice Selector functions
export const { changeRole, showLogout, changeIsLoggedIn, setPreviousPage } =
  authSlice.actions;

// Assigning it to reducer
export default authSlice.reducer;

export const getRole = (state) => state.auth.role;
export const getShowLogout = (state) => state.auth.showLogout;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getPreviousPage = (state) => state.auth.previousPage;
