const Food = require("../models/food");

const fetchFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find({});

    if (!foodItems) {
      return res.status(404).send({
        success: false,
        message: "No food items found!",
      });
    }

    return res.status(200).send({
      success: true,
      totalFoods: foodItems.length,
      foodItems,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching food items",
      error: err,
    });
  }
};

const fetchFoodItemById = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }

    const foodItem = await Food.findById(foodId);

    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: "No food item was found",
      });
    }

    res.status(200).send({
      success: true,
      foodItem,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while fetching food item",
      error: err,
    });
  }
};

const fetchFoodItemByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide a valid restaurant id",
      });
    }

    const food = await Food.find({ restaurant: restaurantId });

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food item was found with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "fetched food based on restaurant",
      food,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while fetching food",
      error: err,
    });
  }
};

const createFoodItem = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newFood = await Food.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    });

    return res.status(201).send({
      success: true,
      message: "New Food item created successfully!",
      newFood,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in creating food item",
      error: err,
    });
  }
};

const updateFoodItem = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found!",
      });
    }

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food was found!",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    const updatedfood = await Food.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        restaurant,
        rating,
      },
      { new: true }
    );

    return res.status(201).send({
      success: true,
      message: "Food Item updated successfully!",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in updating Food item",
      error: err,
    });
  }
};

const deleteFoodItem = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found!",
      });
    }

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food was found!",
      });
    }

    await Food.findByIdAndUpdate(foodId);

    return res.status(200).send({
      success: true,
      message: "Food Item deleted successfully!",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in deleting Food item",
      error: err,
    });
  }
};

module.exports = {
  fetchFoodItems,
  fetchFoodItemById,
  fetchFoodItemByRestaurant,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
};
