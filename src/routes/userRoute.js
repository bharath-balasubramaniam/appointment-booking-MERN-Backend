const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  forgotPwd,
  resetPwd,
} = require("../controllers/userControllers");

const { ifAdmin, ifAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", ifAdmin, allUsers);
router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/forgot-password", forgotPwd);
router.post("/reset-password/:str", resetPwd);

module.exports = router;
