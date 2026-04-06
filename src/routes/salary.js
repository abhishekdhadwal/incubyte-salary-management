const express = require("express");
const { calculateSalary } = require("../controllers/salaryController");
const { idValidationRule } = require("../validators/employeeValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/:id", idValidationRule, validate, calculateSalary);

module.exports = router;
