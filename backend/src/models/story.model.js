const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 86400,
    },
  },
  {
    timestamps: true,
  }
);

const storyModel = mongoose.model("Story", storySchema);

module.exports = storyModel;
