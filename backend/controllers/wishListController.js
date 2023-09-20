import { badRequestError } from "../utils/apiErrors.js";
import AppError from "../utils/appError.js";
import WishList from "./../models/wishListModel.js";

export const createItem = async (req, res, next) => {
  try {
    const item = await WishList.create({
      item: req.body.item,
      user: req.user._id,
    });

    res.status(200).json({
      status: "success",
      listItem: item,
    });
  } catch (err) {
    return next(new AppError(500, "Something went wrong"));
  }
};

export const getAllItems = async (req, res, next) => {
  try {
    const items = await WishList.find();

    res.status(200).json({ status: "success", results: items.length, items });
  } catch (err) {
    return next(
      new AppError(500, "Something went wrong, please try again later"),
    );
  }
};

export const getMyWishlist = async (req, res, next) => {
  try {
    const list = await WishList.find()
      .where({ user: req.user._id })
      .populate({ path: "item" });

    if (list.length === 0)
      return res.status(200).json({
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

export const deleteOne = async (req, res, next) => {
  try {
    const item = await WishList.findOneAndDelete({
      _id: req.params.wishListItemId,
    }).where({ user: req.user._id });

    if (!item) return next(new AppError(404, "No item found with this ID"));

    res.status(200).json({ status: "success", message: "Deleted" });
  } catch (err) {
    return next(new AppError(500, "Something went wrong, try again later."));
  }
};

export const deleteAllItem = async (req, res, next) => {
  try {
    const items = await WishList.deleteMany({ user: req.user._id });

    if (!items) return next(new AppError(404, "No items found in your list"));

    res.status(200).json({
      status: "success",
      message: "Deleted all items",
    });
  } catch (err) {
    return next(new AppError(500, "Something went wrong, try again later."));
  }
};
