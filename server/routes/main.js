const express = require("express");
const router = express.Router();
const main_controller = require("../controllers/mainController");
const Category = require("../models/category");

router.get("/home", main_controller.display_home);
router.post("/points/add", main_controller.add_points_post);

//MARKETPLACE
// Fetch all categories with subcategories
router.get("/categories", main_controller.get_item_categories);

module.exports = router;
