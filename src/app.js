const express = require("express");
const sequelize = require("./config/db");
const employeeRoutes = require("./routes/employees");
const salaryRoutes = require("./routes/salary");
const metricsRoutes = require("./routes/metrics");

require("./models/Employee");

async function createApp() {
  const app = express();
  app.use(express.json());

  await sequelize.sync();

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/employees", employeeRoutes);
  app.use("/salary", salaryRoutes);
  app.use("/metrics", metricsRoutes);

  return app;
}

module.exports = { createApp };
