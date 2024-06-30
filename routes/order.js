const express = require("express");
const { checkAuthentication } = require("../middlewares/auth");
const { placeOrder, updateOrderStatus } = require("../controllers/order");
const adminAuthentication = require("../middlewares/adminAuth");
const router = express.Router();

router.post("/place-order", checkAuthentication, placeOrder);
router.post(
  "/order-status/:id",
  checkAuthentication,
  adminAuthentication,
  updateOrderStatus
);

module.exports = router;
