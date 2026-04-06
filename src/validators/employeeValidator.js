const { body } = require("express-validator");

const employeeValidationRules = [
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("jobTitle").notEmpty().withMessage("jobTitle is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("salary")
    .isFloat({ min: 0 })
    .withMessage("salary must be a non-negative number"),
];

module.exports = employeeValidationRules;
