const Comments = require("../models/comments");
const uploadCommnet = async (req, res) => {
  const { comment, user, post } = req.body;
  try {
    if (!comment || !user || !post)
      return res.status(400).json({
        status: "fail",
        message: "all parameters are required",
      });
    const newCommnet = await Comments.create({
      comment,
      user,
      post,
    });
    res.status(200).json({
      status: "success",
      data: newCommnet,
    });
  } catch (error) {
    console.log(error),
      res.status(200).json({
        status: "fail",
        message: error,
      });
  }
};
const postComment = async (req, res) => {
  const { id } = req.params;
  try {
    const postData = await Comments.find({ post: id }).populate("user");
    res.status(200).json({
      status: "success",
      data: postData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
const countComment = async (req, res) => {
  const { id } = req.params;
  try {
    // Assuming your Comments model has a field called "postId" that references the post
    const count = await Comments.countDocuments({ post: id });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while counting comments." });
  }
};
module.exports = { uploadCommnet, postComment, countComment };
