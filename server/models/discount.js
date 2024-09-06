const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item", // Reference to the Item model
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"], // Type of discount
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minPurchaseAmount: {
      type: Number,
      default: 0, // Default value if no minimum amount is specified
    },
    applicableCustomerGroups: [String], // e.g., ["VIP", "Regular"]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", DiscountSchema);
