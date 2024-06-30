const User = require("../models/user");
const bcrypt = require("bcryptjs");

const findUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User was not found",
      });
    }

    user.password = undefined; // for security, hide the password

    res.status(200).send({
      success: true,
      message: "User found successfully!",
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error finding user",
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User was not found",
      });
    }

    const { username, email } = req.body;
    if (username) user.username = username;
    if (address) user.email = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully!",
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error updating user",
      error: err,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User was not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }

    // check for old password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // hash new password
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error updating password",
      error: err,
    });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User was not found",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error reseting password",
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in deleting user",
      error: err,
    });
  }
};

module.exports = {
  findUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  resetUserPassword,
};
