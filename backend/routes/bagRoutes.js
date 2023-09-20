import express from "express";

import * as authController from "./../controllers/authController.js";
import * as bagController from "./../controllers/bagController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(bagController.createItem)
  .delete(bagController.deleteAllItem)
  .get(authController.checkIsAdmin, bagController.getAllItems);

router
  .route("/my-bag")
  .get(bagController.getMyBag)
  .patch(bagController.toggleAllItems);

router.route("/:bagItemId").delete(bagController.deleteOne);

router.patch("/:bagItemId", (req, res, next) => {
  const { updateName } = req.query;

  if (updateName === "changeChecked") {
    return bagController.updateIsChecked(req, res, next);
  } else if (updateName === "itemDetails") {
    return bagController.addDetails(req, res, next);
  }
});

export default router;
