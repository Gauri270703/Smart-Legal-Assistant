const mongoose = require("mongoose");

const legalCaseSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientName: { type: String, required: true },
  caseTitle: { type: String, required: true },

  evidenceFiles: [{ fileName: String, fileUrl: String }],
  courtDates: [{ date: String, note: String }],
  reminders: [{ task: String, completed: { type: Boolean, default: false } }]
}, { timestamps: true });

module.exports = mongoose.model("LegalCases1", legalCaseSchema);