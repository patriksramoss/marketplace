const mongoose = require("mongoose");

//MODELS
const User = require("../models/user");
const News = require("../models/news");
const Category = require("../models/category");
const Item = require("../models/item");

// Home --------------------

exports.display_home = async (req, res, next) => {
  try {
    const newsArticles = await News.find().sort({ publicationDate: -1 });
    if (!Array.isArray(newsArticles)) {
      throw new Error("Invalid data: newsArticles should be an array");
    }
    res.json(newsArticles);
  } catch (error) {
    console.error("Error fetching news articles:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching news articles." });
  }
};

// User --------------------

exports.get_current_user = (req, res, next) => {
  if (!req.user) {
    // User is not authenticated
    return res.status(401).json({ message: "User is not authenticated" });
  }

  try {
    User.findById(req.user._id).exec(function (err, user) {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.json({
        user: user,
      });
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching current user." });
  }
};

// Points --------------------
exports.add_points_post = (req, res, next) => {
  let amountToAdd = Number(req.body.amountToAdd);

  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    console.error("Invalid amount provided:", req.body.amountToAdd);
    return res.status(400).json({ error: "Invalid amount" });
  }
  amountToAdd = Math.round(amountToAdd); // Sanitize: rounding to ensure it's a whole number

  User.findById(req.user._id).exec(function (err, user) {
    if (err) {
      console.error("Error finding user:", err);
      return next(err);
    }
    user.points += amountToAdd;
    user.save(function (err) {
      if (err) {
        console.error("Error saving user:", err);
        return next(err);
      }
      return res.json({
        points: user.points,
      });
    });
  });
};

// Marketplace --------------------

exports.get_item_categories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories").exec();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories." });
  }
};

exports.get_items_by_category = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.query; // Get categoryId and subcategoryId from query parameters

    let query = {};
    if (subcategoryId) {
      query.subcategory = subcategoryId; // Filter by subcategory ID if present
    } else if (!subcategoryId && categoryId) {
      query.category = categoryId; // Filter by category ID if present
    } else {
      return res
        .status(400)
        .json({ error: "No categoryId or subcategoryId provided." });
    }

    const content = await Item.find(query).exec(); // Execute the query to find items
    res.json(content); // Respond with fetched content
  } catch (error) {
    console.error("Error fetching content:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching content." });
  }
};
