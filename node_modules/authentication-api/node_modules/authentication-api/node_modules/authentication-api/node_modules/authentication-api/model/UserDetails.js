// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String},
  email: {type:String},
  dateOfBirth: { type: Date },
  mobileNumber: { type: String }
});

module.exports = mongoose.model("UserDetails", userSchema);
