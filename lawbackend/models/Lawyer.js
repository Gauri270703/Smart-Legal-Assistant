const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
  name: String,
  address: String,
  specialization: String,
  fees: String,
  phone: String,
  image: String,
  userId: String,
  upiId: String, // for receiving payments
});

module.exports = mongoose.model("Lawyer", lawyerSchema);