const Employee = require("../models/Employee");

const createEmployee = async ({ fullName, jobTitle, country, salary }) => {
  return await Employee.create({ fullName, jobTitle, country, salary });
};

const getEmployeeById = async (id) => {
  return await Employee.findByPk(id);
};

const getAllEmployees = async ({ limit, offset }) => {
  const { count, rows } = await Employee.findAndCountAll({ limit, offset });
  return { employees: rows, total: count, limit, offset };
};

module.exports = { createEmployee, getEmployeeById, getAllEmployees };
