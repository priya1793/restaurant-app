const express = require("express");
const { checkAuthentication } = require("../middlewares/auth");
const {
  fetchFoodItems,
  fetchFoodItemById,
  fetchFoodItemByRestaurant,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../controllers/food");

const router = express.Router();

router.get("/", fetchFoodItems);
router.get("/:id", fetchFoodItemById);
router.get("/restaurant/:id", fetchFoodItemByRestaurant);
router.post("/create", checkAuthentication, createFoodItem);
router.put("/update/:id", checkAuthentication, updateFoodItem);
router.delete("/delete/:id", checkAuthentication, deleteFoodItem);

module.exports = router;
