const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/OrderController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get(
  "/order",
  [authMiddleware.isAuthentication],
  orderController.getListOrder,
);

router.post(
  "/order/create",
  [authMiddleware.isAuthentication],
  orderController.postOrder,
);

router.put(
  "/order/update/:orderId",
  [authMiddleware.isAuthentication, authMiddleware.isAdmin],
  orderController.updateOrder,
);

router.get(
  "/order/:id",
  [authMiddleware.isAuthentication],
  orderController.getOrderDetail,
);

router.get(
  "/user/:id/orders",
  [authMiddleware.isAuthentication],
  orderController.getUserOrders,
);

module.exports = router;
