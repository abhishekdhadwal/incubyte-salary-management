const metricsService = require("../services/metricsService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const getMetrics = async (req, res) => {
  try {
    const { country, jobTitle } = req.query;

    if (country) {
      const result = await metricsService.getSalaryStatsByCountry(country);
      if (!result)
        return sendError(res, "No employees found for this country", 404);
      return sendSuccess(res, result, "Salary stats fetched successfully");
    }

    const result = await metricsService.getAverageSalaryByJobTitle(jobTitle);
    if (!result)
      return sendError(res, "No employees found for this job title", 404);
    return sendSuccess(res, result, "Average salary fetched successfully");
  } catch (err) {
    console.error(err);
    sendError(res, "Failed to fetch metrics", 500);
  }
};

module.exports = { getMetrics };
