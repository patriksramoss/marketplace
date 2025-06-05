const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
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
      default: 0,
    },
    applicableCustomerGroups: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", DiscountSchema);
