const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH || "./salary.db",
  logging: false,
});

module.exports = sequelize;
