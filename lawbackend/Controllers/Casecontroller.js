const Case = require('../models/Case');

// ✅ Get all cases (only titles for dropdown)
const getCases = async (req, res) => {
  try {
    const data = await Case.find().select("case_title");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Error fetching cases" });
  }
};

// ✅ Search case by EXACT title (only 1 result)
const searchCase = async (req, res) => {
  try {
    const title = req.params.title;

    const data = await Case.findOne({
      case_title: title   // ✅ exact match
    });

    if (!data) {
      return res.status(404).json({ message: "Case Not Found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Error searching case" });
  }
};

// ✅ Delete case
const deleteCase = async (req, res) => {
  try {
    const id = req.params.id;

    await Case.findByIdAndDelete(id);

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete Error" });
  }
};

module.exports = { getCases, searchCase, deleteCase };