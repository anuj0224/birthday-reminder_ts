// config/database.js

const { Sequelize } = require('sequelize');

// Replace with your database credentials
export const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

