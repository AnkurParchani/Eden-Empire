import express from "express";
import * as authController from "./../controllers/authController.js";
import * as orderController from "./../controllers/orderController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(authController.checkIsAdmin, orderController.getAllOrders)
  .post(orderController.createOrder);

router.route("/my-orders").get(orderController.myOrders);

router.route("/:orderId").get(orderController.getOrder);

export default router;
