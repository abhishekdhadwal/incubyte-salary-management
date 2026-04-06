const express = require("express");
const { getMetrics } = require("../controllers/metricsController");
const metricsValidationRules = require("../validators/metricsValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", metricsValidationRules, validate, getMetrics);

module.exports = router;
