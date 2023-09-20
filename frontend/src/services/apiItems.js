import axiosInstance from "./axiosConfig";
import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper";

// Getting all the items
export const getAllItems = async () => {
  try {
    const res = await axiosInstance.get(`${localhost}/items`);

    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }

    return res.data.items;
  } catch (err) {
    return handleApiError(err);
  }
};

// Getting all the items according to the search
export const getItems = async () => {
  try {
    let res;
    if (window.location.search !== "/") {
      res = await axiosInstance.get(
        `${localhost}/items${window.location.search}`,
      );
    } else {
      res = await axiosInstance.get(`${localhost}/items`);
    }

    if (res.data.status === "success") {
      return res.data.items;
    }
  } catch (err) {
    return handleApiError(err);
  }
};

// Getting single item
export const getItemApi = async () => {
  try {
    const itemId = window.location.href.split("/").pop();

    const res = await axiosInstance.get(`${localhost}/items/${itemId}`);
    if (res.data.status !== "success") {
      throw new Error("Something went wrong, please try again later");
    }

    return res.data.item;
  } catch (err) {
    return handleApiError(err);
  }
};

// Adding an item
export const addItem = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/items`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return res.data.items;
    }
  } catch (err) {
    handleApiError(err);
  }
};

// For adding color items
export const addColor = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/items/color`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      console.log("Color added");
    }
  } catch (err) {
    handleApiError(err);
  }
};
