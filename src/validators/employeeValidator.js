const { body, query, param } = require("express-validator");

const employeeValidationRules = [
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("jobTitle").notEmpty().withMessage("jobTitle is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("salary")
    .isFloat({ min: 0 })
    .withMessage("salary must be a non-negative number"),
];

const paginationValidationRules = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("offset must be a non-negative integer"),
];

const idValidationRule = [
  param("id").isInt({ min: 1 }).withMessage("id must be a positive integer"),
];

module.exports = {
  employeeValidationRules,
  paginationValidationRules,
  idValidationRule,
};
