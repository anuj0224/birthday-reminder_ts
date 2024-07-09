// config/database.js

const { Sequelize } = require('sequelize');

// Replace with your database credentials
export const sequelize = new Sequelize('database_development', 'root', 'anuj@2002', {
  host: 'localhost',
  dialect: 'mysql',
});

