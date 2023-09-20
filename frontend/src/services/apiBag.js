import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper.js";
import axiosInstance from "./axiosConfig.js";

// Getting items from user's bag
export const getMyBagApi = async () => {
  try {
    const res = await axiosInstance.get(`${localhost}/bag/my-bag`);

    if (res.data.status === "success") {
      return res.data;
    } else {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Item Details adding function
export const addDetailsApi = async (data) => {
  try {
    const { newData, bagId } = data;

    const res = await axiosInstance.patch(
      `${localhost}/bag/${bagId}?updateName=itemDetails`,
      newData,
    );

    if (res.data.status !== "success") {
      console.log(res);
      throw new Error("Something went wrong, please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Adding item to bag function
export const addToBagApi = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/bag`, data);

    if (res.data.status === "success") {
      return res.data;
    } else {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Function to remove item from bag
export const removeFromBagApi = async (itemId) => {
  try {
    const res = await axiosInstance.delete(`${localhost}/bag/${itemId}`);

    if (res.data.status !== "success") {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Function to remove from bag and add to wishlist
export const moveToWishlistFromBagApi = async (data) => {
  try {
    const { item, bagItemId } = data;
    const wishlistData = { item };

    const wishlistRes = await axiosInstance.post(
      `${localhost}/wishlist`,
      wishlistData,
    );
    const bagRes = await axiosInstance.delete(`${localhost}/bag/${bagItemId}`);

    if (
      wishlistRes.data.status !== "success" ||
      bagRes.data.status !== "success"
    ) {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Function to change isChecked property of bag
export const changeIsCheckedApi = async (data) => {
  try {
    const { bagItemId, isChecked } = data;

    const res = await axiosInstance.patch(
      `${localhost}/bag/${bagItemId}?updateName=changeChecked`,
      {
        isChecked,
      },
    );

    if (res.data.status !== "success")
      throw new Error("Something went wrong. Please try again later!");
  } catch (err) {
    handleApiError(err);
  }
};

// Function to toggle all items using checkbox
export const toggleAllApi = async (data) => {
  try {
    const res = await axiosInstance.patch(`${localhost}/bag/my-bag`, data);
    if (res.data.status !== "success") {
      throw new Error("Something went wrong. Please try again later!");
    }
  } catch (err) {
    handleApiError(err);
  }
};
