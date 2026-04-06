const Employee = require("../models/Employee");

const createEmployee = async ({ fullName, jobTitle, country, salary }) => {
  return await Employee.create({ fullName, jobTitle, country, salary });
};

const getAllEmployees = async ({ limit, offset }) => {
  const { count, rows } = await Employee.findAndCountAll({ limit, offset });
  return { employees: rows, total: count, limit, offset };
};

module.exports = { createEmployee, getAllEmployees };
