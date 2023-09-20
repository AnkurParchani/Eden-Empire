import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper.js";

import axiosInstance from "./axiosConfig";

// Add a review
export const addReviewApi = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/reviews`, data);

    if (res.data.status !== "success")
      throw new Error("Something went wrong, please try again later!");
  } catch (err) {
    handleApiError(err);
  }
};

// Get single items reviews
export const getItemReviews = async () => {
  try {
    const itemId = window.location.href.split("/").pop();

    const res = await axiosInstance.get(
      `${localhost}/reviews/item-reviews/${itemId}`,
    );

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }

    return res.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Getting all the reviews of a user
export const getReviewsApi = async (from) => {
  try {
    const res = await axiosInstance.get(
      `${localhost}/reviews/my-reviews?from=${from}`,
    );

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Deleting the review temporarily (to trash)
export const deleteReviewApi = async (reviewId) => {
  try {
    const res = await axiosInstance.patch(
      `${localhost}/reviews/${reviewId}?updateFlag=to-trash`,
    );

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Restoring review from trash
export const restoreReviewApi = async (reviewId) => {
  try {
    const res = await axiosInstance.patch(
      `${localhost}/reviews/${reviewId}?updateFlag=restore`,
    );

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Deleting the review from trash (i.e permanently)
export const deleteTrashReviewApi = async (reviewId) => {
  try {
    const res = await axiosInstance.delete(
      `${localhost}/reviews/${reviewId}?updateFlag=delete`,
    );

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};
