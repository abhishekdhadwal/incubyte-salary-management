const { query } = require("express-validator");

const metricsValidationRules = [
  query("country").optional().notEmpty().withMessage("country cannot be empty"),
  query("jobTitle")
    .optional()
    .notEmpty()
    .withMessage("jobTitle cannot be empty"),
  query().custom((_, { req }) => {
    if (!req.query.country && !req.query.jobTitle) {
      throw new Error("Provide either country or jobTitle as query param");
    }
    return true;
  }),
];

module.exports = metricsValidationRules;
