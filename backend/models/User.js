const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter your name"],
  },
  email: {
    type: String,
    required: [true, "enter your email"],
    validate: [validator.isEmail, "please enter correct mail"],
    // unique: true,
    // lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter password"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
