const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the cart
const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the `updatedAt` field before saving
CartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
