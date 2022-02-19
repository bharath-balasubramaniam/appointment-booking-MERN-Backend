const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { sendEmail } = require("../mailer/mail");
const { randomStr } = require("../mailer/mailTemplate");
///   For Register  ///
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, pic } = req.body;
  if (!name || !email || !password || !contact) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  // check if the user alreadyin  db
  const userExit = await User.findOne({ email });
  if (userExit) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password, pic, contact });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
///   For Login ///
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exist
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Emai or Password");
  }
});
/// Get all users  ///
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .find({ _id: { $ne: req.user._id } })
    .select("-password");
  res.status(200).send(users);
});
/// Forgot Password ///
const forgotPwd = asyncHandler(async (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { randomstr: randomStr } },
    (err, user) => {
      if (!user) {
        return res.json({
          success: false,
          message: "Auth failed email not found",
        });
      } else {
        sendEmail(req.body.email, req.body.name, "reset");
        return res.json({
          success: true,
          message: "Password reset link is sent to this email",
        });
      }
    }
  );
});
/// Reset Password ///
const resetPwd = asyncHandler(async (req, res) => {
  User.findOne({ randomstr: req.params.str }, (err, user) => {
    // encrypt the new password
    bcrypt.hash(req.body.password, 7, function (err, hash) {
      User.findOneAndUpdate(
        { randomstr: req.params.str },
        { $set: { password: hash, randomstr: "" } },
        (err, data) => {
          if (data) {
            res.status(200).json({
              success: true,
              message: "Password Updated!",
            });
          }
        }
      );
    });
  });
});
module.exports = { registerUser, allUsers, authUser, forgotPwd, resetPwd };
