const express = require("express");
const router = express.Router();
const main_controller = require("../controllers/mainController");
const Category = require("../models/category");

//Middleware
const { cache, setCache } = require("../middleware/cacheMiddleware.js");

router.get("/home", main_controller.display_home);
router.post("/points/add", main_controller.add_points_post);

//MARKETPLACE
// Fetch all categories with subcategories
router.get("/categories", cache, main_controller.get_item_categories, setCache);
// Fetch content for a category
router.get(
  "/contentByCategory",
  cache,
  main_controller.get_items_by_category,
  setCache
);
// Fetch recommended content
router.get("/contentRecommended", main_controller.get_recommended_items);

module.exports = router;
