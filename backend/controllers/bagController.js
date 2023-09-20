import { badRequestError } from "../utils/apiErrors.js";
import AppError from "../utils/appError.js";
import Bag from "./../models/bagModel.js";

// Creating a bag item
export const createItem = async (req, res, next) => {
  try {
    const bagItem = await Bag.create({
      item: req.body.item,
      user: req.user._id,
      ...req.body,
    });

    res.status(200).json({
      status: "success",
      bagItem,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Getting all the bag items from all accounts for admin
export const getAllItems = async (req, res, next) => {
  try {
    const items = await Bag.find();

    res.status(200).json({ status: "success", results: items.length, items });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Getting all the bag items of user
export const getMyBag = async (req, res, next) => {
  try {
    const list = await Bag.find()
      .where({ user: req.user._id })
      .populate({ path: "item" });

    if (list.length === 0)
      return res
        .status(200)
        .json({
          status: "success",
          results: 0,
          message: "Your list is currently empty",
        });

    res.status(200).json({
      status: "success",
      results: list.length,
      data: {
        list,
      },
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// To delete a particular item from the list
export const deleteOne = async (req, res, next) => {
  try {
    const item = await Bag.findOneAndDelete({
      _id: req.params.bagItemId,
    }).where({ user: req.user._id });

    if (!item) return next(new AppError(404, "No item found with this ID"));

    res.status(200).json({ status: "success", message: "Deleted" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// To remove all the items from the user's bag
export const deleteAllItem = async (req, res, next) => {
  try {
    const items = await Bag.deleteMany({ user: req.user._id });

    if (!items) return next(new AppError(404, "No items found in your list"));

    res.status(200).json({
      status: "success",
      message: "Deleted all items",
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// function to update checked value for individual item
export const updateIsChecked = async (req, res, next) => {
  try {
    const item = await Bag.findByIdAndUpdate(req.params.bagItemId, {
      isChecked: req.body.isChecked,
    }).where({ user: req.user._id });

    res.status(200).json({ status: "success", data: item });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Toggle all items (checked value) function
export const toggleAllItems = async (req, res, next) => {
  try {
    await Bag.updateMany(
      { user: req.user._id },
      { isChecked: req.body.isChecked },
    );
    res.status(200).json({
      status: "success",
      message: "Items updated successfully",
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Add item details to the bag
export const addDetails = async (req, res, next) => {
  try {
    if (req.body.quantity) {
      req.body = { quantity: Number(req.body.quantity) };
    }

    const bagItem = await Bag.findByIdAndUpdate(req.params.bagItemId, req.body);
    if (!bagItem) return next(new AppError(400, "No bag item found"));

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};
