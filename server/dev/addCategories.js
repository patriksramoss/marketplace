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

const categories = [
  {
    name: "Home & Kitchen",
    description: "Furniture, appliances, and home essentials",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Furniture",
        description: "Tables, chairs, and sofas",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Kitchen Appliances",
        description: "Cooking and cleaning appliances",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Bedding",
        description: "Sheets, pillows, and blankets",
      },
    ],
  },
  {
    name: "Beauty & Personal Care",
    description: "Products for beauty and self-care",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Makeup",
        description: "Cosmetics for face and body",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Hair Care",
        description: "Shampoos, conditioners, and treatments",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Skin Care",
        description: "Creams, serums, and cleansers",
      },
    ],
  },
  {
    name: "Sports & Outdoors",
    description: "Equipment and apparel for outdoor activities",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Camping & Hiking",
        description: "Tents, backpacks, and outdoor gear",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Fitness Equipment",
        description: "Weights, mats, and exercise machines",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Cycling",
        description: "Bicycles and accessories",
      },
    ],
  },
  {
    name: "Books & Stationery",
    description: "Books, notebooks, and office supplies",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Fiction",
        description: "Novels, short stories, and literature",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Non-Fiction",
        description: "Biographies, self-help, and educational books",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Stationery",
        description: "Notebooks, pens, and writing supplies",
      },
    ],
  },
  {
    name: "Automotive",
    description: "Car parts, accessories, and maintenance",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Car Electronics",
        description: "GPS, audio systems, and dash cams",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Exterior Accessories",
        description: "Car covers, roof racks, and lights",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Tools & Equipment",
        description: "Jacks, wrenches, and car maintenance tools",
      },
    ],
  },
  {
    name: "Toys & Games",
    description: "Toys, board games, and video games",
    subcategories: [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Board Games",
        description: "Games for family and friends",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Video Games",
        description: "Consoles and game discs",
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Educational Toys",
        description: "Toys designed for learning and development",
      },
    ],
  },
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
