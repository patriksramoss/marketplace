require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const News = require("../models/news.js");

// Database Connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Adding News Post

const newsPost = new News({
  title: "Development and Production deployment workflow - Done!",
  content:
    "Technical update. The project is now launched and is available publically! Although not accessible for non-registered users, this update creates the possiblity to test the site for production in only couple of minutes! Stripe Test payment form is also added but still needs some work before testing.",
  author: "PR",
  publicationDate: new Date(),
  // image: "https://i.ibb.co/mNvV1ST/reactjs.gif",
  image: null,
});

newsPost
  .save()
  .then((savedPost) => {
    console.log("News post saved:", savedPost);
  })
  .catch((error) => {
    console.error("Error saving post:", error);
  });
