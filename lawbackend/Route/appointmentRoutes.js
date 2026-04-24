const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();

// CREATE APPOINTMENT
// Create appointment
router.post("/appointments/:lawyerId", async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const newAppointment = new Appointment({
      lawyerId, // ✅ MUST SAVE THIS
      ...req.body
    });

    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE PAYMENT (UPI/CARD)
router.put("/appointments/:id/status", async (req, res) => {
  try {
    const { status, meetingLink } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, meetingLink },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get appointments for specific lawyer
router.get("/appointments/lawyer/:lawyerId", async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const appointments = await Appointment.find({ lawyerId });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// LAWYER APPROVE/REJECT + MEETING LINK
router.put("/:id/status", async (req, res) => {
  const { status, meetingLink } = req.body; // status = accepted / rejected
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status, meetingLink },
    { new: true }
  );
  res.json({ message: "Appointment updated", appointment });
});

// GET USER APPOINTMENTS BY EMAIL (for polling)
router.get("/user/:email", async (req, res) => {
  const appointments = await Appointment.find({ email: req.params.email });
  res.json(appointments);
});

// GET APPOINTMENTS FOR LAWYER
router.get("/lawyer/:id", async (req, res) => {
  const appointments = await Appointment.find({ lawyerId: req.params.id });
  res.json(appointments);
});

module.exports = router;