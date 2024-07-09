// config/mailer.js
const http = require('http')
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mouryaanuj62@gmail.com',
    pass: 'yzyfufssdeaydcab',
  },
});

