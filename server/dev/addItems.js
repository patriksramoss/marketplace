require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Category = require("../models/category");
const Item = require("../models/item");

// Database Connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false); // To suppress the deprecation warning

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define your items
const items = [
  {
    name: "Cube 1",
    description: "Just a cube.",
    price: 799.99,
    images: {
      min: [
        "https://i.imgur.com/i763nKi.png",
        "https://i.imgur.com/whUPPmm.png",
      ],
      max: [
        "https://i.imgur.com/i763nKi.png",
        "https://i.imgur.com/whUPPmm.png",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Mobile Phones",
  },
  {
    name: "Cube 2",
    description: "Just a cube.",
    price: 199.99,
    images: {
      min: [
        "https://i.imgur.com/i763nKi.png",
        "https://i.imgur.com/whUPPmm.png",
      ],
      max: [
        "https://i.imgur.com/i763nKi.png",
        "https://i.imgur.com/whUPPmm.png",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Mobile Phones",
  },
];

const createItems = async () => {
  try {
    const categories = await Category.find({}); // Fetch all categories

    // Create a map from category names to category documents
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.name] = category;
      return acc;
    }, {});

    // Prepare items for insertion with the correct category and subcategory IDs
    const itemsWithCategory = items.map((item) => {
      const category = categoryMap[item.categoryName] || categoryMap["Other"];
      const subcategory = category.subcategories.find(
        (sub) => sub.name === item.subcategoryName
      ) || {
        _id: mongoose.Types.ObjectId("defaultSubcategoryId"),
        name: "Other",
        description: "",
      };

      return {
        ...item,
        category: category._id,
        subcategory: subcategory._id,
      };
    });

    await Item.deleteMany(); // Clear existing items
    const result = await Item.insertMany(itemsWithCategory);
    console.log("Items created:", result);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating items:", error);
  }
};

createItems();
