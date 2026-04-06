const express = require("express");
const {
  createEmployee,
  getAllEmployees,
} = require("../controllers/employeeController");
const {
  employeeValidationRules,
  paginationValidationRules,
} = require("../validators/employeeValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", paginationValidationRules, validate, getAllEmployees);
router.post("/", employeeValidationRules, validate, createEmployee);

module.exports = router;
