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
    userPhoto: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
