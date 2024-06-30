const User = require("../models/user");

const adminAuthentication = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.role !== "admin") {
      res.status(401).send({
        success: false,
        message: "Admin access only!",
      });
    }

    next();
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Unauthorized access",
      error: err,
    });
  }
};

module.exports = adminAuthentication;
