const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const {
  employeeValidationRules,
  paginationValidationRules,
  idValidationRule,
} = require("../validators/employeeValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", paginationValidationRules, validate, getAllEmployees);
router.get("/:id", idValidationRule, validate, getEmployeeById);
router.post("/", employeeValidationRules, validate, createEmployee);
router.put(
  "/:id",
  idValidationRule,
  employeeValidationRules,
  validate,
  updateEmployee,
);
router.delete("/:id", idValidationRule, validate, deleteEmployee);

module.exports = router;
