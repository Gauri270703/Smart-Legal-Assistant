const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" }, // ✅ REQUIRED

  userName: String,
  email: String,
  phone: String,
  date: Date,
  note: String,

  paymentMethod: String,
  paymentStatus: String,
  paymentId: String,

  status: { type: String, default: "pending" },
  meetingLink: String,
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);