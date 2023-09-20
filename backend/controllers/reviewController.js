import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import AppError from "../utils/appError.js";
import ApiFeatures from "../utils/apiFeatures.js";

import { emptyList } from "../utils/helper.js";
import { badRequestError } from "../utils/apiErrors.js";

// HTTP Methods
// Getting all the reviews from all the users
export const getAllReviews = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Review.find(), req.query)
      .filter()
      .sort()
      .pagination()
      .limitFields();

    const reviews = await features.query;

    if (reviews.length === 0)
      return next(new AppError(404, "No reviews found."));

    res
      .status(200)
      .json({ status: "success", results: reviews.length, reviews });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Getting all the reviews of a single item
export const getItemReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .where({ item: req.params.itemId })
      .populate("user");

    if (reviews.length === 0) {
      return emptyList(res);
    }

    res.status(200).json({
      status: "success",
      results: reviews.length,
      reviews,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Getting only a single user's reviews
export const myReviews = async (req, res, next) => {
  try {
    let filterReviews;
    const { from } = req.query;

    const reviews = await Review.find()
      .where({ user: req.user._id })
      .populate({
        path: "item",
        select: "mainImageFilename details name",
      })
      .populate({ path: "user", select: "photo name" });

    if (reviews.length === 0) return emptyList(res);

    if (from === "profile") {
      filterReviews = reviews.filter((review) => !review.inTrash);
    } else if (from === "trash") {
      filterReviews = reviews.filter((review) => review.inTrash);
    }

    res.status(200).json({
      status: "success",
      results: filterReviews.length,
      data: filterReviews,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Creating review (official)
export const createReview = async (req, res, next) => {
  try {
    // Getting the necessary details
    if (!req.body.stars || !req.body.review || !req.body.item)
      return next(new AppError(400, "Please fill all the necessary details."));

    const user = await User.findById(req.user._id).populate("reviews");
    // Getting all the reviews of users
    const userReviews = user.reviews;

    // If user has reviews
    if (userReviews) {
      // Checking if user has already review that item before
      const hasAlreadyReviewed = userReviews.some(
        (review) => String(review.item) === String(req.body.item),
      );

      if (hasAlreadyReviewed)
        return next(new AppError(400, "You have already reviewed this item"));
    }

    // If the code reaches here that means user has never reviewed that item before
    const userOrders = await Order.find().where({ user: req.user._id });
    const hasReviewOrder = userOrders.some(
      (order) => String(order.item) === String(req.body.item),
    );

    if (!userOrders || !hasReviewOrder)
      return next(
        new AppError(
          400,
          "You need to buy this product first in order to review it",
        ),
      );

    // Else return success
    req.body.user = req.user._id;

    // Creating the review
    const review = await Review.create(req.body);

    res.status(200).json({
      status: "success",
      review,
    });
  } catch (err) {
    console.log(err);
    return badRequestError(res, err, next);
  }
};

// Deleting the reviewe
export const deleteReview = async (req, res, next) => {
  try {
    const { updateFlag } = req.query;
    let review;
    if (updateFlag === "to-trash") {
      review = await Review.findByIdAndUpdate(req.params.reviewId, {
        inTrash: true,
      }).where({
        user: req.user._id,
      });
    } else if (updateFlag === "delete") {
      review = await Review.findByIdAndDelete(req.params.reviewId).where({
        user: req.user._id,
      });
    }

    if (!review) return next(new AppError(404, "No reviews found"));

    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// Restoring the review from trash
export const restoreReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.reviewId, {
      inTrash: false,
    }).where({ user: req.user._id });

    if (!review) return next(new AppError(404, "No reviews found"));

    res.status(200).json({ status: "success" });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};
