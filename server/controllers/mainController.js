const mongoose = require("mongoose");

//MODELS
const User = require("../models/user");
const News = require("../models/news");
const Category = require("../models/category");
const Item = require("../models/item");
const Discount = require("../models/discount");

//Helpers
const redisClient = require("../helpers/redisClient"); // Import your Redis client

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

exports.get_points = (req, res, next) => {
  User.findById(req.user._id).exec(function (err, user) {
    if (err) {
      console.error("Error finding user:", err);
      return next(err);
    }
    return res.json({
      points: user.points,
    });
  });
};

// Marketplace --------------------

exports.get_item_categories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories").exec();
    res.locals.data = categories; // Set the data to res.locals
    res.json(categories); // Respond with fetched content
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

    const items = await Item.find(query).lean().exec(); // Execute the query to find items

    // Get current date
    const now = new Date();

    // Fetch active discounts
    const discounts = await Discount.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).exec();

    // Map discounts by item ID
    const discountMap = new Map();
    discounts.forEach((d) => discountMap.set(d.item.toString(), d));

    // Adjust item prices and add discount indication
    const itemsWithDiscounts = items.map((item) => {
      const discount = discountMap.get(item._id.toString());
      if (discount) {
        // Calculate discounted price
        if (discount.discountType === "percentage") {
          item.discountedPrice =
            item.price - item.price * (discount.value / 100);
        } else if (discount.discountType === "fixed") {
          item.discountedPrice = item.price - discount.value;
        }

        // Indicate that the item is discounted
        item.isDiscounted = true;
      } else {
        // No discount applied
        item.discountedPrice = item.price;
        item.isDiscounted = false;
      }
      return item;
    });

    res.locals.data = itemsWithDiscounts; // Set the adjusted data to res.locals
    res.json(itemsWithDiscounts); // Respond with adjusted content
  } catch (error) {
    console.error("Error fetching content:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching content." });
  }
};

// Fetch recommended items with discounts
exports.get_recommended_items = async (req, res) => {
  try {
    const currentDate = new Date();

    // Fetch active discounts
    const discounts = await Discount.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    }).populate("item");

    // Extract item IDs from discounts
    const itemIds = discounts.map((discount) => discount.item._id);

    // Fetch items with the applicable discount
    const items = await Item.find({ _id: { $in: itemIds } })
      .lean()
      .exec();

    // Apply discounts to items
    const discountedItems = items.map((item) => {
      const discount = discounts.find((d) => d.item._id.equals(item._id));
      if (discount) {
        // Calculate discounted price
        let discountedPrice;
        if (discount.discountType === "percentage") {
          discountedPrice = item.price - (item.price * discount.value) / 100;
        } else if (discount.discountType === "fixed") {
          discountedPrice = item.price - discount.value;
        }

        // Ensure the discounted price does not go below zero
        discountedPrice = Math.max(discountedPrice, 0);

        // Add discount details to the item
        item.isDiscounted = true;
        item.discountedPrice = discountedPrice;
      } else {
        // No discount applied
        item.isDiscounted = false;
        item.discountedPrice = item.price;
      }

      return item;
    });

    res.locals.data = discountedItems;
    res.json(discountedItems);

    // Optionally cache the result
    const cacheKey = "recommended_items";
    const ttl = 3600; // Cache for 1 hour
    await redisClient.setEx(cacheKey, ttl, JSON.stringify(discountedItems));
  } catch (error) {
    console.error("Error fetching recommended items:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching recommended items." });
  }
};
