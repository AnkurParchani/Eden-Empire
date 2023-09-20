import express from "express";

import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router
  .route("/signup")
  .post(authController.checkAdminKey, authController.signup);

router.route("/login").post(authController.login);

router.use(authController.protect);
router.route("/").get(authController.checkIsAdmin, userController.getAllUsers);

router.route("/updateMyPassword").post(authController.updatePassword);
router.route("/change-role").post(authController.changeRoleRequest);

router
  .route("/:userId")
  .get(authController.checkSameUser, userController.getUser)
  .delete(authController.checkSameUser, userController.deleteUser)
  .patch(
    authController.checkSameUser,
    userController.uploadUserPhoto,
    userController.updateOne,
  );

export default router;
