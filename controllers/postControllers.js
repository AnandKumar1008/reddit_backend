const Posts = require("../models/post");
// const

const uploadPost = async (req, res) => {
  try {
    const data = await Posts.create({ ...req.body, image: req.file?.path });
    console.log(data);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "success",
      message: error,
    });
  }
};
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Posts.find({ user: id });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "No data found",
    });
  }
};

const allPost = async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
module.exports = { uploadPost, getPost, allPost };
