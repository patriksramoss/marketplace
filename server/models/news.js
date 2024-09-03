const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// NEWS MODEL
const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
        type: String
      },
    author: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
