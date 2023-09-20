import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper.js";
import axiosInstance from "./axiosConfig";

// Getting all the items from wishlist
export const getWishlistApi = async () => {
  try {
    const res = await axiosInstance.get(`${localhost}/wishlist/my-wishlist`);

    if (res.data.status === "success") {
      return res.data;
    } else {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Add to wishlist function
export const addToWishlistApi = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/wishlist`, data);

    if (res.data.status !== "success") {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Deleting a particular item from wishlist
export const removeFromWishlistApi = async (itemId) => {
  try {
    const res = await axiosInstance.delete(`${localhost}/wishlist/${itemId}`);

    if (res.data.status !== "success") {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};
