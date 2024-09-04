require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Category = require("../models/category");

// Database Connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false); // To suppress the deprecation warning

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define your categories and subcategories
const categories = [
  {
    name: "Electronics",
    description: "Devices and gadgets",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Mobile Phones",
        description: "Smartphones and accessories",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Laptops",
        description: "Portable computers",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Cameras",
        description: "Digital and film cameras",
      },
    ],
  },
  {
    name: "Clothing",
    description: "Apparel and accessories",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Men",
        description: "Clothing for men",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Women",
        description: "Clothing for women",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Kids",
        description: "Clothing for kids",
      },
    ],
  },
  // Add more categories with subcategories as needed
];

const createCategories = async () => {
  try {
    await Category.deleteMany(); // Clear existing categories

    const result = await Category.insertMany(categories);
    console.log("Categories created:", result);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating categories:", error);
  }
};

createCategories();
