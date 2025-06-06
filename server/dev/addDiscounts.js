const mongoose = require("mongoose");
const Discount = require("../models/discount");

require("dotenv").config({ path: "../.env" });

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const discountData = [
  {
    item: "66d85695715d96726b2b4658",
    discountType: "percentage",
    value: 20,
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    minPurchaseAmount: 0,
    applicableCustomerGroups: [],
  },
  {
    item: "66d85695715d96726b2b4659",
    discountType: "percentage",
    value: 20,
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    minPurchaseAmount: 0,
    applicableCustomerGroups: [],
  },
];

async function populateDiscounts() {
  try {
    await Discount.deleteMany();
    await Discount.insertMany(discountData);
  } catch (error) {
    console.error("Error populating discounts:", error);
  } finally {
    mongoose.connection.close();
  }
}

populateDiscounts();
