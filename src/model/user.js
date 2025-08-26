const mongoose = require("mongoose");
const { roles } = require("../config/roleconfig");

const userschema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: roles,
    default: "user",
  },
});

module.exports.User = mongoose.model("User", userschema);
