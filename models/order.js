const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "preparing",
      enum: ["preparing", "prepared", "on the way", "delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
