import { localhost } from "../../utils/helper.js";
import { handleApiError } from "../../utils/apiErrors.js";
import axiosInstance from "./axiosConfig.js";

export const getUsersApi = async (userId) => {
  try {
    const res = await axiosInstance.get(`${localhost}/users/${userId}`);

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, Please try again later");
    }

    // When there is user then returning the user
    if (res.data.user) return { ...res.data.user, isLoggedIn: true };
    // Else when there is no user (i.e not logged in) then returning the data only
    else return res.data;
  } catch (err) {
    handleApiError(err);
  }
};

export const editProfile = async (data, userId) => {
  try {
    const res = await axiosInstance.patch(`${localhost}/users/${userId}`, data);

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, Please try again later");
    }

    return res.data.data.user;
  } catch (err) {
    handleApiError(err);
  }
};

export const deleteAccount = async (data, userId) => {
  try {
    const res = await axiosInstance.delete(`${localhost}/users/${userId}`, {
      data,
    });

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, Please try again later");
    }

    return res.data.message;
  } catch (err) {
    handleApiError(err);
  }
};
