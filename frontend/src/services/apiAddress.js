import { handleApiError } from "../../utils/apiErrors";
import { localhost } from "../../utils/helper.js";
import axiosInstance from "./axiosConfig";

export const getAddressApi = async () => {
  try {
    const res = await axiosInstance.get(
      `${localhost}/address/my-addresses?from=profile`,
    );

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const getTrashAddressApi = async () => {
  try {
    const res = await axiosInstance.get(
      `${localhost}/address/my-addresses?from=trash`,
    );

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const addAddressApi = async (data) => {
  try {
    const res = await axiosInstance.post(`${localhost}/address`, data);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const restoreAddressApi = async (addressId) => {
  try {
    const res = await axiosInstance.patch(
      `${localhost}/address/${addressId}?updateFlag=restore`,
    );
    if (res.data.status === "success") {
      return { status: true, message: "Address restored successfully" };
    } else {
      return {
        status: false,
        message: "failed to delete address.",
      };
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const deleteAddressApi = async (addressId) => {
  try {
    const res = await axiosInstance.patch(
      `${localhost}/address/${addressId}?updateFlag=delete`,
    );
    if (res.data.status === "success") {
      return { status: true, message: "Address deleted successfully" };
    } else {
      return {
        status: false,
        message: "failed to delete address.",
      };
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const deleteTrashAddressApi = async (addressId) => {
  try {
    const res = await axiosInstance.patch(
      `${localhost}/address/${addressId}?updateFlag=deleteTrash`,
    );
    if (res.data.status === "success") {
      return { status: true, message: "Address deleted successfully" };
    } else {
      return {
        status: false,
        message: "failed to delete address.",
      };
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const editAddressApi = async (addressId, newAddressData) => {
  try {
    const res = await axiosInstance.patch(
      `${localhost}/address/${addressId}?updateFlag=update`,
      newAddressData,
    );

    if (res.data.status === "success") {
      return { status: true, message: "Address updated successfully" };
    } else {
      console.log("Error on updating address:", res.data);
      return { status: false, message: "Error on updating address" };
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const changeDelilveryAddressApi = async (data) => {
  const { addressId, isChecked } = data;

  try {
    const res = await axiosInstance.patch(
      `${localhost}/address/${addressId}?updateFlag=changeDeliveryAddress`,
      { isChecked },
    );

    if (res.data.status !== "success") {
      console.log(res);
      throw new Error("Something went wrong. Please try again later");
    }
  } catch (err) {
    handleApiError(err);
  }
};
