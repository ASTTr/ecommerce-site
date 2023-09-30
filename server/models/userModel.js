const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  videoFile: { type: String },
  screenFile: { type: String },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
