const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: Number, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    },
    isAdmin: { type: Boolean, default: false },
    randomstr: {
      type: String,
    },
  },
  { timeStamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
