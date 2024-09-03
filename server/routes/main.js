const express = require("express");
const router = express.Router();
const main_controller = require("../controllers/mainController");

router.get("/home", main_controller.display_home);
router.post("/points/add", main_controller.add_points_post);

module.exports = router;
