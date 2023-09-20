import express from "express";

import * as authController from "./../controllers/authController.js";
import * as itemsController from "./../controllers/itemsController.js";

const router = express.Router();

// Routes
router
  .route("/")
  .get(itemsController.getAllItems)
  .post(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.uploadItemImages,
    itemsController.postItem,
  );

router
  .route("/:itemId")
  .get(itemsController.getItem)
  .delete(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.deleteItem,
  )
  .patch(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.updateOne,
  );

// For color model
router
  .route("/color")
  .post(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.uploadItemImages,
    itemsController.createNewColorItem,
  );

export default router;
