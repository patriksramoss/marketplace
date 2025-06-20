const { body, validationResult } = require("express-validator");

//MODELS
const User = require("../models/user");
const Cart = require("../models/cart");
const News = require("../models/news");

const axios = require("axios");
const bcrypt = require("bcrypt");
const ip = require("ip");

//helpers
const findCurrency = require("../helpers/findCurrency");

exports.google_register_post = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    const { sub, name, email } = response.data;

    let user = await User.findOne({ googleId: sub });
    if (!user) {
      const currency = findCurrency(ip.address());

      user = new User({
        username: name,
        email: email,
        googleId: sub,
        currency: currency,
      });
      await user.save();

      const cart = new Cart({ userId: user._id });
      await cart.save();

      user.cart = cart._id;
      await user.save();
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error in req.login:", err);
        return res.status(500).json({
          success: false,
          message: "An error occurred during login.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Registration successful",
      });
    });
  } catch (err) {
    console.error("Error in google_register_post:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

// News / Home --------------------
exports.index_get = async (req, res, next) => {
  // ################# News Feed ###################
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

// Signup --------------------

exports.signup_get = (req, res, next) => {
  return res.render("form-sign-up", { title: "Register" });
};

exports.sign_up_post = [
  body("email", "Must be a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Password required")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("passConfirm", "Password confirmation required")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  body("username", "Username required")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered. Please choose another.",
        });
      }

      const currency = findCurrency(ip.address());

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        currency: currency,
      });

      await newUser.save();

      const cart = new Cart({ userId: newUser._id });
      await cart.save();

      newUser.cart = cart._id;
      await newUser.save();

      req.login(newUser, (err) => {
        if (err) {
          console.error("Error in req.login:", err);
          return res.status(500).json({
            success: false,
            message: "An error occurred during login.",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Registration successful",
        });
      });
    } catch (err) {
      console.error("Error in sign_up_post:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred during registration.",
      });
    }
  },
];

exports.login_get = (req, res, next) => {
  res.render("form-log-in", {
    title: "Log In",
    errors: req.flash("error"),
  });
};

exports.login_post = [
  body("email", "Must be a valid email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Password cannot be empty").trim().notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error("Error in req.logIn:", err);
          return res.status(500).json({
            success: false,
            message: "An error occurred during login.",
          });
        }

        return res
          .status(200)
          .json({ success: true, message: "Authentication successful" });
      });
    } catch (error) {
      console.error("Error in login_post:", error);
      return res
        .status(500)
        .json({ success: false, message: "An error occurred." });
    }
  },
];

exports.logout_get = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    return res.status(200).json({
      success: true,
      message: "Logged Out.",
    });
  });
};
