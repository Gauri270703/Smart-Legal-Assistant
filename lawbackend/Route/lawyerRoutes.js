const express = require("express");
const router = express.Router();
const Lawyer = require("../models/Lawyer");
const {
  createProfile,
  updateProfile,
  getProfileByUserId
} = require("../Controllers/lawyerController");

// Create, update, get by userId
router.post("/lawyer-profile", createProfile);
router.put("/lawyer-profile/:id", updateProfile);
router.get("/lawyer-profile/:userId", getProfileByUserId);

// ✅ NEW ROUTE: Get all lawyers
router.get("/lawyers", async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.json(lawyers); // returns array of all lawyers
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching lawyers" });
  }
});
// GET single lawyer info
router.get("/lawyer/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json(lawyer);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lawyer" });
  }
});


module.exports = router;