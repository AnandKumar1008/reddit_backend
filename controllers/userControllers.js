const Users = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRound = 10;
const signup = async (req, res) => {
  const { email, password, username, userPhoto = "" } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }
  try {
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "User the Emal already Registered",
      });
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await Users.create({
      email,
      password: hashPassword,
      username,
      userPhoto,
    });
    res.status(200).json({
      status: "success",
      message: "User creation Successful",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
//let make a accountVerification
// const verifyAccount=(req,res)=>{

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "No such Username is registered yet",
      });

    const isCorrect = bcrypt.compareSync(password, user.password);
    if (isCorrect) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // update the login info
      const update = await Users.findByIdAndUpdate(
        user._id,
        {
          $set: { login: true },
        },
        { new: true }
      );

      //sending the response after getting the user detail
      res.status(200).json({
        status: "Success",
        token,
        data: update,
      });
    } else {
      res.status(403).json({
        message: "Invalid Password, try again !!",
        status: "fail",
      });
    }
  } catch (error) {
    console.log("Error in logging", error);
    res.status(404).json({
      status: "fail",
      message: "Invalid Token",
    });
  }
};

// }
//chek for login of user
const firebaseLogin = async (req, res) => {
  const { email, username, userPhoto } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      await Users.findByIdAndUpdate(
        user._id,
        { $set: { login: true } },
        { new: true }
      );
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        status: "success",
        data: user,
        token,
      });
    }
    const newUser = await Users.create({
      email,
      username,
      userPhoto,
      login: true,
      password: userPhoto,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ status: "success", data: newUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};

const checkToken = async (req, res) => {
  const { token } = req.body;
  try {
    let decode = "";

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err);
        } else {
        }
        decode = decoded;
      }
    );

    const { id } = decode;
    const user = await Users.findById(id);
    if (user.login) {
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
    res.status(400).json({
      status: "fail",
      message: "Please login First",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

//handleLogout
const logout = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      {
        $set: { login: false },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "logout successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
module.exports = { signup, login, firebaseLogin, checkToken, logout };
