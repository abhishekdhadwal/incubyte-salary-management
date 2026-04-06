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

const updateEmployee = async (id, { fullName, jobTitle, country, salary }) => {
  const employee = await Employee.findByPk(id);
  if (!employee) return null;
  return await employee.update({ fullName, jobTitle, country, salary });
};

module.exports = {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
};
