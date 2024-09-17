const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// USER MODEL
const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email cannot be empty"],
      match: [/\S+@\S+\.\S+/, "Must be valid email"],
      unique: true,
    },
    password: { type: String, required: false },
    googleId: { type: String, unique: true, sparse: true }, // sparse allows multiple null values
    cards: {
      id: [
        {
          _id: false,
          cardId: { type: Schema.Types.ObjectId, required: true, ref: "Card" },
          quantity: { type: Number, required: true },
        },
      ],
    },
    packs: {
      id: [
        {
          _id: false,
          packId: { type: Schema.Types.ObjectId, required: true, ref: "Pack" },
          quantity: { type: Number, required: true },
        },
      ],
    },
    balance: { type: Number, required: true, default: 0.0 },
    currency: { type: String, required: true },
    sandbox: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (input) {
  return input === this.password;
};

module.exports = mongoose.model("User", UserSchema);
