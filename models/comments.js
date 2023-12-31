const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comments", commentSchema);
