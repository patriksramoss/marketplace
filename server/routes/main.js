const express = require("express");
const router = express.Router();
const main_controller = require("../controllers/mainController");
const Category = require("../models/category");

//Middleware
const { cache, setCache } = require("../middleware/cacheMiddleware.js");
const authCheckTrue = require("../helpers/authCheckTrue");

// _________________ Home  _________________ //

router.get("/home", main_controller.display_home);

// _________________ Balance  _________________ //

router.post("/balance/add", authCheckTrue, main_controller.add_balance_post);

// _________________ Marketplace  _________________ //

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

router.post("/addToCart", authCheckTrue, main_controller.add_to_cart);
router.get("/getCart", authCheckTrue, main_controller.get_cart);

router.get("/clearCart", authCheckTrue, main_controller.clear_cart);
router.post("/cartRemoveItem", authCheckTrue, main_controller.cart_remove_item);
router.post(
  "/cartChangeItemQuantity",
  authCheckTrue,
  main_controller.cart_change_item_quantity
);

router.get(
  "/searchForItems",
  cache,
  main_controller.search_for_items,
  setCache
);

// _________________ User  _________________ //

router.get("/user", authCheckTrue, main_controller.get_current_user);
router.get("/balance", authCheckTrue, main_controller.get_balance);
router.get("/landing", authCheckTrue, main_controller.display_home);

module.exports = router;
