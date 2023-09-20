import multer from "multer";

import AppError from "../utils/appError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import Review from "../models/reviewModel.js";
import Bag from "../models/bagModel.js";
import Order from "../models/orderModel.js";
import WishList from "../models/wishListModel.js";

import { filterObj } from "../utils/filterObj.js";
import { badRequestError } from "../utils/apiErrors.js";

// Configuring the multerstorage
const multerStorage = multer.diskStorage({
  // File destination
  destination: (req, file, cb) => {
    cb(null, "public/user-images");
  },

  // Each file (pic) of item
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const imgName = `user-${req.user._id}-${Date.now()}.${ext}`;
    cb(null, imgName);
  },
});

// Checking if the provided file is an img or not
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "uploaded file is not an image"), false);
  }
};

// Assigning storage and filter to multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("photo");

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const features = new ApiFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const users = await features.query;

    if (users.length === 0)
      return next(new AppError(404, "No users found in the list"));

    res.status(200).json({
      results: users.length,
      status: "success",
      users,
    });
  } catch (err) {
    console.log("Error from user controller getallusers", err);
  }
};

// Get single user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return next(new AppError(404, "No user found with this ID"));

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Update a single user
export const updateOne = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmPassword)
      return next(new AppError(400, "This route is not for updating password"));

    const filteredBody = filterObj(req.body, "email", "name");
    if (req?.file?.filename) {
      filteredBody.photo = req.file.filename;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      filteredBody,
      { new: true, runValidators: true },
    );

    if (!updateUser) return next(new AppError(400, "Invalid user Id"));

    res.status(200).json({
      status: "success",
      data: {
        user: updateUser,
      },
    });
  } catch (err) {
    if (err.code === 11000)
      return next(new AppError(400, "Email already exists"));
    else console.log(err);
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const privacyConsent = req.body.hasAcceptedPrivacyConditions;

    // Checking if the user is accepting privacy conditions or not
    if (typeof privacyConsent !== "boolean" || !privacyConsent)
      return next(new AppError(400, "Please accept privacy conditions"));

    // Getting the user
    const user = await User.findById(req.params.userId).select("+password");

    // If user not found
    if (!user) return next(new AppError(404, "No user found with this ID"));

    // If there is no password
    if (!req.body.password)
      return next(new AppError(400, "Please enter your password"));

    // If user's password is invalid
    if (!(await user.checkCredentials(req.body.password, user.password)))
      return next(new AppError(401, "Incorrect password"));

    // Deleting the user
    await User.findByIdAndDelete(req.params.userId);

    // Deleting all his addresses
    await Address.deleteMany({ user: req.params.userId });

    // Deleting all his reviews
    await Review.deleteMany({ user: req.params.userId });

    // Deleting all his orders
    await Order.deleteMany({ user: req.params.userId });

    // Deleting all his wishlist
    await WishList.deleteMany({ user: req.params.userId });

    // Deleting all his bags items
    await Bag.deleteMany({ user: req.params.userId });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return badRequestError(res, err, next);
  }
};
