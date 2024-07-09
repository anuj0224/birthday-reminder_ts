// index.ts
import {Request, Response}  from 'express';
const express = require('express')

import { sequelize } from './config/database'; // Adjust path as per your project structure
import User from './models/user'; // Adjust path as per your project structure
import {checkBirthdaysAndSendReminders} from './scripts/sendBirthdayReminders'; // Adjust path as per your project structure

const app = express();

// Example route
app.get('/', (req : Request, res: Response) => {
  res.send('Hello World!');
});

// Start the application
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Ensure Sequelize has synchronized all models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    // Run script for sending birthday reminders
    checkBirthdaysAndSendReminders();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
