const employeeService = require("../services/employeeService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const createEmployee = async (req, res) => {
  try {
    const { fullName, jobTitle, country, salary } = req.body;
    const employee = await employeeService.createEmployee({
      fullName,
      jobTitle,
      country,
      salary,
    });
    sendSuccess(res, employee, "Employee created successfully", 201);
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to create employee", 500);
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const result = await employeeService.getAllEmployees({ limit, offset });
    sendSuccess(res, result, "Employees fetched successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to fetch employees", 500);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) return sendError(res, "Employee not found", 404);
    sendSuccess(res, employee, "Employee fetched successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to fetch employee", 500);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { fullName, jobTitle, country, salary } = req.body;
    const employee = await employeeService.updateEmployee(req.params.id, {
      fullName,
      jobTitle,
      country,
      salary,
    });
    if (!employee) return sendError(res, "Employee not found", 404);
    sendSuccess(res, employee, "Employee updated successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to update employee", 500);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
};
