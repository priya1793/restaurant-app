const Order = require("../models/order");

const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please provide the food cart",
      });
    }

    let total = 0;
    cart.map((item) => (total += item.price));

    const newOrder = await Order.create({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    return res.status(201).send({
      success: true,
      message: "Order placed successfully!",
      newOrder,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in placing an order!",
      error: err,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order Id!",
      });
    }

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Order status updated successfully!",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in updating an order status!",
      error: err,
    });
  }
};

module.exports = {
  placeOrder,
  updateOrderStatus,
};
