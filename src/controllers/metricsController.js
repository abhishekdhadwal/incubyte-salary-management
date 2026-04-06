const metricsService = require("../services/metricsService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const getSalaryStatsByCountry = async (req, res) => {
  try {
    const result = await metricsService.getSalaryStatsByCountry(
      req.params.country,
    );
    if (!result)
      return sendError(res, "No employees found for this country", 404);
    sendSuccess(res, result, "Salary stats fetched successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to fetch salary stats", 500);
  }
};

const getAverageSalaryByJobTitle = async (req, res) => {
  try {
    const result = await metricsService.getAverageSalaryByJobTitle(
      req.params.jobTitle,
    );
    if (!result)
      return sendError(res, "No employees found for this job title", 404);
    sendSuccess(res, result, "Average salary fetched successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to fetch average salary", 500);
  }
};

module.exports = { getSalaryStatsByCountry, getAverageSalaryByJobTitle };
