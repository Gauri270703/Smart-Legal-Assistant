const LegalCases1 = require("../models/LegalCases1");

// CREATE CASE
const createCase = async (req, res) => {
  try {
    const { lawyerId, clientName, caseTitle } = req.body;
    if (!lawyerId || !clientName || !caseTitle)
      return res.status(400).json({ message: "All fields are required" });

    const newCase = new LegalCases1({ lawyerId, clientName, caseTitle });
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating case" });
  }
};

// GET CASES BY LAWYER
const getCasesByLawyer = async (req, res) => {
  try {
    const cases = await LegalCases1.find({ lawyerId: req.params.lawyerId });
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cases" });
  }
};

// ADD EVIDENCE
const addEvidence = async (req, res) => {
  try {
    const { caseId } = req.params;
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded");

    const fileUrl = `/uploads/${file.filename}`;
    const updated = await LegalCases1.findByIdAndUpdate(
      caseId,
      { $push: { evidenceFiles: { fileName: file.originalname, fileUrl } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading evidence");
  }
};

// ADD COURT DATE
const addCourtDate = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { date, note } = req.body;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const updated = await LegalCases1.findByIdAndUpdate(
      caseId,
      { $push: { courtDates: { date, note } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding court date");
  }
};

// ADD REMINDER
const addReminder = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required" });

    const updated = await LegalCases1.findByIdAndUpdate(
      caseId,
      { $push: { reminders: { task } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding reminder");
  }
};

module.exports = {
  createCase,
  getCasesByLawyer,
  addEvidence,
  addCourtDate,
  addReminder
};