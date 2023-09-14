const Posts = require("../models/post");
require("dotenv").config();
const uploadPost = async (req, res) => {
  try {
    const path = req.file?.path
      ? `${process.env.BASE_URL}/${req.file.path}`
      : "";

    const data = await Posts.create({
      ...req.body,
      image: path,
    });

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
//upload existing post if the user tries to comment on that post
const noUserPost = async (req, res) => {
  try {
    const data = await Posts.create({ ...req.body });

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
//here is its end

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Posts.findById(id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "No data found",
    });
  }
};

const allPost = async (req, res) => {
  const { page = 1, pageSize = 7 } = req.query;

  try {
    const skip = (page - 1) * pageSize;

    const posts = await Posts.find()
      .populate("user")
      .skip(skip)
      .limit(parseInt(pageSize))
      .exec();

    res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
module.exports = { uploadPost, getPost, allPost, noUserPost };
