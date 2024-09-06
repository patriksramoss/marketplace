const mongoose = require("mongoose");
const Discount = require("../models/discount"); // Adjust the path to your Discount model

require("dotenv").config({ path: "../.env" });

// Database Connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false); // To suppress the deprecation warning

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Discount data

const discountData = [
  {
    item: "66d85695715d96726b2b4658", // Item ID for the first item
    discountType: "percentage",
    value: 20, // Discount value of 20%
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // In 1 week
    minPurchaseAmount: 0,
    applicableCustomerGroups: [], // Leave empty or specify customer groups if needed
  },
  {
    item: "66d85695715d96726b2b4659", // Item ID for the second item
    discountType: "percentage",
    value: 20, // Discount value of 20%
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // In 1 week
    minPurchaseAmount: 0,
    applicableCustomerGroups: [], // Leave empty or specify customer groups if needed
  },
];

async function populateDiscounts() {
  try {
    await Discount.deleteMany(); // Clear existing discounts
    await Discount.insertMany(discountData); // Insert new discounts
    console.log("Discounts added successfully.");
  } catch (error) {
    console.error("Error populating discounts:", error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}

populateDiscounts();
