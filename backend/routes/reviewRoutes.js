import express from "express";

import * as reviewController from "./../controllers/reviewController.js";
import * as authController from "./../controllers/authController.js";

const router = express.Router();

router.route("/").get(reviewController.getAllReviews);
router.route("/item-reviews/:itemId").get(reviewController.getItemReviews);

router.use(authController.protect);

router.route("/").post(reviewController.createReview);
router.route("/my-reviews").get(reviewController.myReviews);
router.route("/:reviewId").delete(reviewController.deleteReview);

router.patch("/:reviewId", (req, res, next) => {
  const { updateFlag } = req.query;

  if (updateFlag === "to-trash") {
    return reviewController.deleteReview(req, res, next);
  } else if (updateFlag === "restore") {
    return reviewController.restoreReview(req, res, next);
  }
});

export default router;
