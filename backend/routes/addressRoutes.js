import express from "express";
import * as authController from "./../controllers/authController.js";
import * as addressController from "./../controllers/addressController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(authController.checkIsAdmin, addressController.getAllAddress)
  .post(addressController.addAddress);

router.get("/my-addresses", (req, res, next) => {
  const { from } = req.query;

  if (from === "profile")
    return addressController.getMyAddresses(req, res, next);
  if (from === "trash")
    return addressController.getMyTrashAddresses(req, res, next);
});

router.route("/:addressId").get(addressController.getOneAddress);

router.patch("/:addressId", (req, res, next) => {
  const { updateFlag } = req.query;

  if (updateFlag === "update") {
    return addressController.updateAddress(req, res, next);
  } else if (updateFlag === "changeDeliveryAddress") {
    return addressController.changeDelilveryAddress(req, res, next);
  } else if (updateFlag === "restore") {
    return addressController.restoreAddressFromTrash(req, res, next);
  } else if (updateFlag === "deleteTrash") {
    return addressController.deleteAddressFromTrash(req, res, next);
  } else if (updateFlag === "delete") {
    return addressController.deleteAddress(req, res, next);
  }
});

export default router;
