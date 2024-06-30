const Restaurant = require("../models/restaurant");

const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title or coords",
      });
    }

    const newRestaurant = await Restaurant.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    res.status(201).send({
      success: true,
      message: "New Restaurant created successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in creating resturant",
      error: err,
    });
  }
};

const fetchRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurants are available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while fetching resturants",
      error: err,
    });
  }
};

const fetchRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found",
      });
    }

    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while fetching resturant",
      error: err,
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found or Please provide valid restaurant id",
      });
    }

    await Restaurant.findByIdAndDelete(restaurantId);

    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while deleting resturant",
      error: err,
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found or Please provide valid restaurant id",
      });
    }

    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      },
      { new: true }
    );

    if (!updateRestaurant) {
      return res.status(500).send({
        success: false,
        message: "No restaurant found!",
      });
    }

    res.status(201).send({
      success: true,
      message: "Restaurant updated successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while updating resturant",
      error: err,
    });
  }
};

module.exports = {
  createRestaurant,
  fetchRestaurants,
  fetchRestaurantById,
  deleteRestaurant,
  updateRestaurant,
};
