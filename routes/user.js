const express = require("express");
const {
  findUser,
  updateUser,
  updateUserPassword,
  resetUserPassword,
  deleteUser,
} = require("../controllers/user");
const { checkAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/", checkAuthentication, findUser);

router.put("/update", checkAuthentication, updateUser);

router.post("/update-password", checkAuthentication, updateUserPassword);

router.post("/reset-password", checkAuthentication, resetUserPassword);

router.delete("/delete/:id", checkAuthentication, deleteUser);

module.exports = router;
