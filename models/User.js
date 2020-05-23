const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  completeName: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cvSummary: {
    type: String,
    default: "",
    required: false
  }
});

let User = (module.exports = mongoose.model("User", userSchema));
