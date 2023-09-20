import { configureStore } from "@reduxjs/toolkit";

import bagReducer from "./features/bag/bagSlice";
import itemReducer from "./features/item/itemSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    bag: bagReducer,
    auth: authReducer,
    item: itemReducer,
  },
});

export default store;
