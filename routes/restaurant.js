const express = require("express");
const { checkAuthentication } = require("../middlewares/auth");
const {
  fetchRestaurants,
  fetchRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant");

const router = express.Router();

router.get("/", fetchRestaurants);
router.get("/:id", fetchRestaurantById);
router.post("/create", checkAuthentication, createRestaurant);
router.put("/update/:id", checkAuthentication, updateRestaurant);
router.delete("/delete/:id", checkAuthentication, deleteRestaurant);

module.exports = router;
