// scripts/sendBirthdayReminders.ts

import cron from 'node-cron';
import { Op } from 'sequelize';
import User from '../models/user'; // Adjust path as per your project structure
import { transporter } from '../config/mailer';
import sequelize from 'sequelize'; // Assuming you have a Sequelize instance configured

export const checkBirthdaysAndSendReminders = async (): Promise<void> => {
  try {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1; // Months are zero-indexed

    const usersWithBirthdayToday = await User.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('dob')), todayMonth),
          sequelize.where(sequelize.fn('DAY', sequelize.col('dob')), todayDay)
        ]
      },
    });

    usersWithBirthdayToday.forEach(async (user) => {
      const usersExceptCurrent = await User.findAll({
        where: {
          id: { [Op.not]: user.id }
        }
      });

      console.log('Reminder email sent to colleague:');

      usersExceptCurrent.forEach((colleague) => {
        const mailOptions = {
          from: 'SENDERS_EMAIL_ADDRESS',
          to: colleague.email,
          subject: 'Birthday Reminder',
          text: `Dear ${colleague.name},\n\nToday is ${user.name}'s birthday! Don't forget to wish them a fantastic day.\n\nBest regards,\nYour Team`,
        };
        
        transporter.sendMail(mailOptions, (error: Error, info:String) => {
          if (error) {
            console.error('Error sending email:', error.message);
          } else {
            console.log(colleague.name)
          }
        });
      });
    });

    console.log('Birthday reminders processed successfully');
  } catch (error) {
    console.error('Error processing birthday reminders:', error);
  }
};

// Schedule the function to run daily at 9:00 AM
cron.schedule('0 9 * * *', () => {
  checkBirthdaysAndSendReminders();
});
