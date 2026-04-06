const { getEmployeeById } = require("./employeeService");
const { TDS_RATES } = require("../config/constants");

const calculateSalary = async (id) => {
  const employee = await getEmployeeById(id);
  if (!employee) return null;

  const gross = employee.salary;
  const rate = TDS_RATES[employee.country] || 0;
  const tds = gross * rate;
  const net = gross - tds;

  return { gross, tds, net, country: employee.country };
};

module.exports = { calculateSalary };
