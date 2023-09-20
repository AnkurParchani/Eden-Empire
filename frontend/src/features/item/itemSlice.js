import { createSlice } from "@reduxjs/toolkit";

// The initial state
const initialState = {
  items: [],
  headerItems: [],
};

// Main slice Dispatch functions
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItems(state, action) {
      state.items = action.payload;
    },
    addHeaderItems(state, action) {
      state.headerItems = action.payload;
    },
  },
});

// Main slice Selector functions
export const { addItems, addHeaderItems } = itemSlice.actions;

// Assigning it to reducer
export default itemSlice.reducer;

export const getItems = (state) => state.item.items;
export const getHeaderItems = (state) => state.item.headerItems;
