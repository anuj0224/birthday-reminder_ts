// config/mailer.js
const http = require('http')
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,      // or 465
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'USER_EMAIL_ADDRESS',
    pass: 'USER_APP_PASSWORD',
  },
});

