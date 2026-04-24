const Lawyer = require("../models/Lawyer");

// ✅ CREATE PROFILE
const createProfile = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const newProfile = new Lawyer(req.body);
    const savedProfile = await newProfile.save();

    res.json(savedProfile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving profile");
  }
};

// ✅ UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    console.log("Update Data:", req.body);

    const updatedProfile = await Lawyer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProfile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating profile");
  }
};

// ✅ GET PROFILE BY USER ID
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Lawyer.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching profile");
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfileByUserId
};