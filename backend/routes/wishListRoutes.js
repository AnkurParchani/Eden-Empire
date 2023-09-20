import express from "express";

import * as authController from "./../controllers/authController.js";
import * as wishListController from "./../controllers/wishListController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(wishListController.createItem)
  .delete(wishListController.deleteAllItem)
  .get(authController.checkIsAdmin, wishListController.getAllItems);

router.route("/my-wishlist").get(wishListController.getMyWishlist);

router.route("/:wishListItemId").delete(wishListController.deleteOne);

export default router;
