import AppError from "./../utils/appError.js";
import Order from "./../models/orderModel.js";
import Bag from "./../models/bagModel.js";
import ApiFeatures from "./../utils/apiFeatures.js";
import { badRequestError } from "../utils/apiErrors.js";

// HTTP Methods
// All orders from all users
export const getAllOrders = async (req, res, next) => {
  try {
    // Implementing API Features
    const features = new ApiFeatures(Order.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const orders = await features.query;

    if (orders.length === 0)
      return next(new AppError(404, "Orders list empty"));

    res.status(200).json({
      status: "success",
      results: orders.length,
      orders,
    });
  } catch (err) {
    return badRequestError(res, err);
  }
};

// Getting all the orders of a particular user
export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().where({ user: req.user._id }).populate({
      path: "item",
      select:
        "mainImageFilename details name priceBeforeDiscount priceAfterDiscount description",
    });

    if (orders.length === 0)
      return res.status(200).json({
        status: "success",
        results: 0,
        message: "There aren't any orders currently in you list",
      });

    res
      .status(200)
      .json({ status: "success", results: orders.length, data: orders });
  } catch (err) {
    return badRequestError(res, err);
  }
};

// Creating order
export const createOrder = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    if (
      !req.body.address ||
      !req.body.item ||
      !req.body.totalQuantity ||
      !req.body.totalAmount
    )
      return next(new AppError(400, "Please fill all the necessary details."));

    const order = await Order.create(req.body);

    await Bag.deleteOne({ _id: req.body.bag });

    res.status(200).json({ status: "success", order });
  } catch (err) {
    return badRequestError(res, err);
  }
};

// Getting a single order
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .where({
        user: req.user._id,
      })
      .populate({
        path: "item",
        select:
          "price priceBeforeDiscount priceAfterDiscount mainImageFilename details discount name description",
      })
      .populate({ path: "address", select: "-__v -user" })
      .populate({ path: "user", select: "email" });

    if (!order) {
      return next(new AppError(404, "No order found"));
    }

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};
