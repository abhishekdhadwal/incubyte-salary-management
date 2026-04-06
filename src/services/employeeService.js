const Employee = require("../models/Employee");

const createEmployee = async ({ fullName, jobTitle, country, salary }) => {
  return await Employee.create({ fullName, jobTitle, country, salary });
};

const getAllEmployees = async () => {
  return await Employee.findAll();
};

module.exports = { createEmployee, getAllEmployees };
