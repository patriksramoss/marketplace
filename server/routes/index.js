const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_controller = require("../controllers/authController");
const card_controller = require("../controllers/mainController");
const authCheckTrue = require("../helpers/authCheckTrue");

// _________________ Google OAuth Routes Start _________________ //

// Route to handle callback from Google OAuth
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home or to a specific page
    res.redirect("/");
  }
);

router.post("/auth/google/register", auth_controller.google_register_post);

// _________________ Google OAuth Routes End _________________ //

// _________________ Authentication Start _________________ //

router.get("/auth/check", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      console.log("Authenticated!!!!!!!!!");
      res.status(200).json({ message: "Authenticated" });
    } else {
      console.log("Authenticated FAILED!!!!!!!!!");
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log("Authenticated ERROR!!!!!!!!!");
    console.error("Error checking authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// _________________ Authentication End _________________ //

router.get("/", authCheckTrue, auth_controller.index_get);
router.get("/register", authCheckTrue, auth_controller.signup_get);
router.post("/register", auth_controller.sign_up_post);

//router.get("/login", authCheckTrue, auth_controller.login_get);
router.post("/login", auth_controller.login_post);
router.get("/logout", auth_controller.logout_get);

//api
router.get("/user", card_controller.get_current_user);
router.get("/landing", card_controller.display_home);

module.exports = router;
