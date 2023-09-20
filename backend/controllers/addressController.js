import { badRequestError } from "../utils/apiErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { emptyList } from "../utils/helper.js";
import Address from "./../models/addressModel.js";
import AppError from "./../utils/appError.js";

// HTTP Methods
// Getting all the addresses of all users
export const getAllAddress = async (req, res, next) => {
  try {
    // Implementing apiFeatures
    const features = new ApiFeatures(Address.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const address = await features.query;

    res
      .status(200)
      .json({ status: "success", results: address.length, data: address });
  } catch (err) {
    console.log("getAllAddress method", err);
  }
};

// Getting addresses of a particular user
export const getMyAddresses = async (req, res, next) => {
  try {
    // Getting all the address of the currently logged in user
    const addresses = await Address.find().where({ user: req.user._id });

    // If the list is empty
    if (addresses.length === 0) return emptyList(res);

    const filterAddresses = addresses.filter(
      (address) => !address.isDeleted && !address.inTrash,
    );

    // The response
    res.status(200).json({
      status: "success",
      results: filterAddresses.length,
      data: filterAddresses,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Getting all the trash addresses of a particular user
export const getMyTrashAddresses = async (req, res, next) => {
  try {
    // Getting all the address of the currently logged in user
    const addresses = await Address.find().where({ user: req.user._id });

    // If the list is empty
    if (addresses.length === 0) return emptyList(res);

    const filterAddresses = addresses.filter(
      (address) => address.isDeleted && address.inTrash,
    );

    // The response
    res.status(200).json({
      status: "success",
      results: addresses.length,
      data: filterAddresses,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Getting single address of user (Not used in the app)
export const getOneAddress = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findById(req.params.addressId).where({
      user: req.user._id,
    });

    // If No address found
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Sending the response
    res.status(200).json({ status: "success", data: address });
  } catch (err) {
    console.log("getOneAddress", err);
  }
};

// Add address funcitonality
export const addAddress = async (req, res, next) => {
  try {
    if (req.body.phoneNumber.length !== 10)
      return next(new AppError(400, "Phone number must be of 10 digits"));

    // Adding the currently logged in user id to the address
    req.body.user = req.user._id;

    const address = await Address.create(req.body);

    res.status(200).json({
      status: "success",
      address,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Update address functionality
export const updateAddress = async (req, res, next) => {
  try {
    // Checking if phone number is under 10 digits
    if (req.body.phoneNumber.length !== 10)
      return next(new AppError(400, "Phone number must be of 10 digits"));

    // Finding the address
    const address = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      { new: true, runValidators: true },
    ).where({
      user: req.user._id,
    });

    // If there's no address
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Sending the response
    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Delete address functionality and moving to trash
export const deleteAddress = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findByIdAndUpdate(req.params.addressId, {
      isDeleted: true,
      inTrash: true,
    }).where({
      user: req.user._id,
    });

    // If there's no address
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Sending the response
    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Restoring the address from the trash
export const restoreAddressFromTrash = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findByIdAndUpdate(req.params.addressId, {
      isDeleted: false,
      inTrash: false,
    }).where({
      user: req.user._id,
    });

    // If there's no address
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Sending the response
    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Delete address from the trash (i.e permanently deleting the address for the user)
export const deleteAddressFromTrash = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findByIdAndUpdate(req.params.addressId, {
      isDeleted: true,
      inTrash: false,
    }).where({
      user: req.user._id,
    });

    // If there's no address
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Sending the response
    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Changing the delivery address of the user functionality
export const changeDelilveryAddress = async (req, res, next) => {
  try {
    // Removing isDeliveryAddress from every address
    await Address.updateMany({
      isDeliveryAddress: false,
    }).where({ user: req.user._id });

    // Adding the isDeliveryAddress to true to selected one
    const mutate = await Address.findOneAndUpdate(
      { _id: req.params.addressId },
      { isDeliveryAddress: req.body.isChecked },
    ).where({ user: req.user._id });

    if (!mutate)
      return next(
        new AppError(500, "Something went wrong, please try again later!"),
      );

    // Sending the response
    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};
