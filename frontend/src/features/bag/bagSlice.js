import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bag: [],
  quantity: 4,
  // details: {},
};

// Dispatch functions (useDispatch)
const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    // Adding (only Checked) item to the array from the database
    addItem(state, action) {
      state.bag = action.payload;
    },

    // Item details to add the size, qty, color etc of item
    // itemDetails(state, action) {
    //   const { key, value } = action.payload;
    //   state.details = { ...state.details, [key]: value };
    // },
  },
});

// Exporting all functions
export const { addItem } = bagSlice.actions;

// Assigning it to reducer
export default bagSlice.reducer;

// Get functions (useSelector)
// Getting bag items function
export const getBag = (state) => state.bag.bag;

// Getting length of all the checked items
export const getCheckedItemsLength = (state) =>
  state.bag.bag.filter((item) => item.isChecked).length;

// Getting total bag amount (before discount)
export const getTotalPriceBeforeDiscount = (state) =>
  state.bag.bag.reduce(
    (acc, currentItem) => currentItem.item.priceBeforeDiscount + acc,
    0,
  );

// Getting all the item details
// export const getItemDetails = (state) => state.bag;

//  Getting total bag amount (after discount)
export const getTotalPriceAfterDiscount = (state) =>
  state.bag.bag.reduce(
    (acc, currentItem) => currentItem.item.priceAfterDiscount + acc,
    0,
  );
