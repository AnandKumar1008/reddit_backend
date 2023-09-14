const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: "",
    },
    textArea: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    video_url: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    vote: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("posts", postSchema);
