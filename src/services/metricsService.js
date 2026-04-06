const { Op, fn, col } = require("sequelize");
const Employee = require("../models/Employee");

const getSalaryStatsByCountry = async (country) => {
  const employees = await Employee.findAll({ where: { country } });
  if (!employees.length) return null;

  const salaries = employees.map((e) => e.salary);
  const min = Math.min(...salaries);
  const max = Math.max(...salaries);
  const average = salaries.reduce((a, b) => a + b, 0) / salaries.length;

  return { country, min, max, average };
};

const getAverageSalaryByJobTitle = async (jobTitle) => {
  const employees = await Employee.findAll({ where: { jobTitle } });
  if (!employees.length) return null;

  const average =
    employees.reduce((a, e) => a + e.salary, 0) / employees.length;

  return { jobTitle, average };
};

module.exports = { getSalaryStatsByCountry, getAverageSalaryByJobTitle };
