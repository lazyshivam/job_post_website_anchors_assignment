const config = require('../config/config');
const CONSTANT = require('../config/constant');
var nodemailer = require('nodemailer');

const transport = nodemailer.createTransport(config.email.smtp);

const sendEmail = async (to, subject, htmlBody) => {
  const mailOptions = {
    from: config.email.from, // Replace with your sender information
    to,
    subject,
    html: htmlBody,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    // console.log(`Email sent: ${info.messageId}`, info);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error('Failed to send OTP email');
  }
};

const sendOTPOnMail = async (userEmail,otp) => {
  const htmlBody = `
  <body>
    <p>Thank you for choosing us. We really appreciate your support.</p>
    <p>Your OTP (One Time Password) is below.</p>
    <strong>${otp}</strong>
    <p>To get started with ss, Please enter your OTP to authenticate your login details. Ensure you do not share your OTP with anyone. This OTP expires in 15 minutes</p>
    <p>Need help, or have questions Just reply to this email, we'd love to help.</p>
  </body>
  `;
  try {
    await sendEmail(userEmail, 'Registration - Welcome to ss', htmlBody);
    return true;
  } catch (error) {
    throw new Error('Failed to send OTP email');
  }
};

module.exports = {
  sendOTPOnMail:sendOTPOnMail,
};
