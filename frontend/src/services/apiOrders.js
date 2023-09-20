import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper.js";
import axiosInstance from "./axiosConfig";

// Getting all the order details
export const getOrdersApi = async () => {
  try {
    const res = await axiosInstance.get(`${localhost}/orders/my-orders`);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

// Getting a specific order details
export const getOrderApi = async (orderId) => {
  try {
    const res = await axiosInstance.get(`${localhost}/orders/${orderId}`);

    if (res.data.status === "success") {
      return res.data.data.order;
    }
  } catch (err) {
    handleApiError(err);
  }
};

// creating new order from checkout
export const checkoutOrderApi = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/orders`, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.data.status !== "success") {
      throw new Error("Something went wrong. Please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};
