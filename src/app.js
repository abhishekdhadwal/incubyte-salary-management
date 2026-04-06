const express = require("express");
const sequelize = require("./config/db");
const employeeRoutes = require("./routes/employees");

require("./models/Employee");

async function createApp() {
  const app = express();
  app.use(express.json());

  await sequelize.sync();

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/employees", employeeRoutes);

  return app;
}

module.exports = { createApp };
