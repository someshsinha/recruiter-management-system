// src/services/email.service.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false otherwise
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendVerificationEmail(to, token) {
  const verifyLink = `${process.env.APP_BASE_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to Recruiter Platform</h2>
        <p>Hi there,</p>
        <p>Please verify your email by clicking the button below:</p>
        <p><a href="${verifyLink}" 
              style="background-color: #007bff; color: white; padding: 10px 20px; 
                     text-decoration: none; border-radius: 5px;">Verify Email</a></p>
        <p>Or open this link directly in your browser:</p>
        <p><a href="${verifyLink}" target="_blank">${verifyLink}</a></p>
        <p>This link will expire in 24 hours.</p>
        <hr />
        <p>If you didn’t create an account, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Verification email sent to ${to}`);
}

module.exports = { sendVerificationEmail };

