const express = require("express");
const router = express.Router();

const {
  getCases,
  searchCase,
  deleteCase
} = require("../controllers/caseController");

router.get("/cases", getCases);
router.get("/search/:title", searchCase);
router.delete("/delete/:id", deleteCase);

module.exports = router; 
