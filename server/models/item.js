const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ITEM MODEL
const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      default: () => mongoose.Types.ObjectId("defaultCategoryId"), // Default category ID
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Category.subcategories", // Reference to subcategories in Category
      default: () => mongoose.Types.ObjectId("defaultSubcategoryId"), // Default subcategory ID
    },
    images: {
      min: {
        type: [String], // Array of strings for image URLs
        default: [], // Default to an empty array if no images are provided
      },
      max: {
        type: [String], // Array of strings for image URLs
        default: [], // Default to an empty array if no images are provided
      },
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
