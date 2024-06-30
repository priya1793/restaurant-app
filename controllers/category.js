const Category = require("../models/category");

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found!",
      });
    }

    return res.status(200).send({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in getting category",
      error: err,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title or image",
      });
    }

    const newCategory = await Category.create({
      title,
      imageUrl,
    });

    return res.status(201).send({
      success: true,
      message: "Category successfully created!",
      newCategory,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in creating Category",
      error: err,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true }
    );

    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found!",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Category successfully updated!",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in updating Category",
      error: err,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide categoryId",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category found with this id!",
      });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Category successfully deleted!",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in deleting Category",
      error: err,
    });
  }
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
