const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const ifAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        isAdmin: true,
      }).select("-password");
      if (user) {
        req.user = user;
      } else {
        res.status(401);
        throw new Error("Not authorized , token failed");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
const ifAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
      }).select("-password");
      if (user) {
        req.user = user;
      } else {
        res.status(401);
        throw new Error("Not authorized , token failed");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports = { ifAdmin, ifAuth };
