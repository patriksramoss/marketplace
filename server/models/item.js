const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      default: () => mongoose.Types.ObjectId("defaultCategoryId"),
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Category.subcategories",
      default: () => mongoose.Types.ObjectId("defaultSubcategoryId"),
    },
    images: {
      min: {
        type: [String],
        default: [],
      },
      max: {
        type: [String],
        default: [],
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
