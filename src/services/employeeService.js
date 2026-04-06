const Employee = require("../models/Employee");

const createEmployee = async ({ fullName, jobTitle, country, salary }) => {
  return await Employee.create({ fullName, jobTitle, country, salary });
};

module.exports = { createEmployee };
