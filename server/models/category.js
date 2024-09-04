const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CATEGORY MODEL
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure unique category names
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    subcategories: [
      {
        _id: Schema.Types.ObjectId, // Define subcategory ID as ObjectId
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
