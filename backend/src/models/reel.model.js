const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    media: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const reelModel = mongoose.model("Reel", reelSchema);
module.exports = reelModel;
