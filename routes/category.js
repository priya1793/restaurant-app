const express = require("express");
const { checkAuthentication } = require("../middlewares/auth");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const router = express.Router();

router.get("/", getCategory);
router.post("/create", checkAuthentication, createCategory);
router.put("/update/:id", checkAuthentication, updateCategory);
router.delete("/delete/:id", checkAuthentication, deleteCategory);

module.exports = router;
