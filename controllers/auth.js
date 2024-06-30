const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  try {
    const { username, email, password, phone, address, role } = req.body;

    if (!username || !email || !password || !phone || !address || !role) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email address already registered, Please login!",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    res.status(201).send({
      success: true,
      message: "User has registered successfully!",
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in registering user",
      error: err,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User was not found!",
      });
    }

    // compare password
    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(500).send({
        success: false,
        message: "Invalid password provided!",
      });
    }

    // token check
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    existingUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "User has logged in successfully!",
      user: existingUser,
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in logging user",
      error: err,
    });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
