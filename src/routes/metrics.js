const express = require("express");
const {
  getSalaryStatsByCountry,
  getAverageSalaryByJobTitle,
} = require("../controllers/metricsController");

const router = express.Router();

router.get("/country/:country", getSalaryStatsByCountry);
router.get("/job-title/:jobTitle", getAverageSalaryByJobTitle);

module.exports = router;
