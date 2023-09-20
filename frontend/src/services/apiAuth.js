import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper";
import axiosInstance from "./axiosConfig";

export const signup = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/users/signup`, data);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const login = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/users/login`, data);
    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const changeRoleRequestApi = async (data) => {
  try {
    const res = await axiosInstance.post(
      `${localhost}/users/change-role`,
      data,
    );
    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const changePassword = async (data) => {
  try {
    const res = await axiosInstance.post(
      `${localhost}/users/updateMyPassword`,
      data,
    );

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, Please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};
