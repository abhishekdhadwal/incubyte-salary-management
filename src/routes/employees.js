const express = require("express");
const { createEmployee } = require("../controllers/employeeController");
const employeeValidationRules = require("../validators/employeeValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/", employeeValidationRules, validate, createEmployee);

module.exports = router;
