const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createCase,
  getCasesByLawyer,
  addEvidence,
  addCourtDate,
  addReminder
} = require("../Controllers/legalCaseController");

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post("/create", createCase);
router.get("/lawyer/:lawyerId", getCasesByLawyer);
router.post("/evidence/:caseId", upload.single("file"), addEvidence);
router.post("/court-date/:caseId", addCourtDate);
router.post("/reminder/:caseId", addReminder);

module.exports = router;