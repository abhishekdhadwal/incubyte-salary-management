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

module.exports = { createEmployee };
