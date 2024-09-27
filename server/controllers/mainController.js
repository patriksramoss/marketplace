const mongoose = require("mongoose");

//MODELS
const User = require("../models/user");
const Cart = require("../models/cart");
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

// Balance --------------------
exports.add_balance_post = (req, res, next) => {
  let amountToAdd = Number(req.body.amountToAdd);

  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    console.error("Invalid amount provided:", req.body.amountToAdd);
    return res.status(400).json({ error: "Invalid amount" });
  }

  User.findById(req.user._id).exec(function (err, user) {
    if (err) {
      console.error("Error finding user:", err);
      return next(err);
    }
    user.balance += amountToAdd;
    user.save(function (err) {
      if (err) {
        console.error("Error saving user:", err);
        return next(err);
      }
      return res.json({
        balance: user.balance,
      });
    });
  });
};

exports.get_balance = (req, res, next) => {
  User.findById(req.user._id).exec(function (err, user) {
    if (err) {
      console.error("Error finding user:", err);
      return next(err);
    }
    return res.json({
      balance: user.balance,
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
    const { categoryId } = req.query; // Get categoryId and subcategoryId from query parameters

    if (!categoryId) {
      return res.status(400).json({ error: "No categoryId provided." });
    }

    // Filter by categoryId for both category and subcategory fields
    const query = {
      $or: [{ category: categoryId }, { subcategory: categoryId }],
    };
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

exports.add_to_cart = async (req, res, next) => {
  let quantity = Number(req.body.quantity);
  const itemId = req.body.itemId;

  if (isNaN(quantity) || quantity <= 0) {
    console.error("Invalid amount provided:", req.body.quantity);
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    // Find the user
    const user = await User.findById(req.user._id).populate("cart");

    if (!user || !user.cart) {
      // If user doesn't have a cart, create one
      const newCart = new Cart({ userId: user._id, items: [] });
      user.cart = newCart._id;
      await newCart.save();
    }

    // Find the cart associated with the user
    const cart = await Cart.findById(user.cart);

    // Check if the item is already in the cart
    const existingItem = cart.items.find(
      (item) => item.item.toString() === itemId
    );

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      cart.items.push({ item: itemId, quantity });
    }

    // Save the updated cart
    await cart.save();

    return res
      .status(200)
      .json({ message: "Item added to cart successfully", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    return next(err);
  }
};

exports.get_cart = async (req, res, next) => {
  try {
    // Find the user and populate the cart
    const user = await User.findById(req.user._id).populate("cart");

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Get the cart items
    const cartItems = user.cart.items;

    // Find the detailed item data for each item in the cart
    const itemIds = cartItems.map((item) => item.item); // Extract item IDs
    const items = await Item.find({ _id: { $in: itemIds } }); // Fetch item data

    // Map the item data with the quantities in the cart
    const cartWithDetails = cartItems.map((cartItem) => {
      const item = items.find(
        (item) => item._id.toString() === cartItem.item.toString()
      );
      return {
        itemId: cartItem.item,
        quantity: cartItem.quantity,
        data: item || null, // Include item data if found, else null
      };
    });

    // Return the detailed cart data
    return res.status(200).json({ cart: cartWithDetails });
  } catch (err) {
    console.error("Error fetching cart:", err);
    return next(err);
  }
};

exports.clear_cart = async (req, res, next) => {
  try {
    // Find the user
    const user = await User.findById(req.user._id).populate("cart");

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the cart associated with the user
    const cart = await Cart.findById(user.cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    console.error("Error clearing cart:", err);
    return next(err);
  }
};

exports.cart_remove_item = async (req, res, next) => {
  const itemId = req.body.itemId;
  try {
    // Find the user
    const user = await User.findById(req.user._id).populate("cart");

    if (!user || !user.cart) {
      return res.status(404).json({ message: "User does not have a cart" });
    }

    // Find the cart associated with the user
    const cart = await Cart.findById(user.cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items.find((item) => {
      if (item) {
        if (item.item.toString() === itemId) {
          cart.items.splice(cart.items.indexOf(item), 1);
        }
      }
    });

    await cart.save();

    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (err) {
    console.error("Error updating cart:", err);
    return next(err);
  }
};

exports.cart_change_item_quantity = async (req, res, next) => {
  const itemId = req.body.itemId;
  const value = req.body.value;
  const override = req.body.override;
  try {
    // Find the user
    const user = await User.findById(req.user._id).populate("cart");

    if (!user || !user.cart) {
      return res.status(404).json({ message: "User does not have a cart" });
    }

    // Find the cart associated with the user
    const cart = await Cart.findById(user.cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items.find((item) => {
      if (item) {
        if (item.item.toString() === itemId) {
          if (override) {
            item.quantity = value;
          } else {
            item.quantity += value;
          }
        }
      }
    });

    await cart.save();

    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (err) {
    console.error("Error updating cart:", err);
    return next(err);
  }
};
exports.search_for_items = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ error: "No search query." });
    }

    const items = await Item.find({
      name: { $regex: new RegExp(search, "i") },
    })
      .lean()
      .exec();

    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "An error occurred while fetching items." });
  }
};
