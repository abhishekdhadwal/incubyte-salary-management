const salaryService = require("../services/salaryService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const calculateSalary = async (req, res) => {
  try {
    const result = await salaryService.calculateSalary(req.params.id);
    if (!result) return sendError(res, "Employee not found", 404);
    sendSuccess(res, result, "Salary calculated successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to calculate salary", 500);
  }
};

module.exports = { calculateSalary };
