const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["user", "lawyer"],
    required: true
  },

  // ✅ ADD THIS
  barNumber: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);