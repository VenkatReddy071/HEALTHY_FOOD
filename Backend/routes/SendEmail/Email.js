const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (recipientEmail, otp) => {
    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
          }
          .email-header {
            background-color: #2ecc71;
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
            color: #333333;
          }
          .email-body h2 {
            color: #27ae60;
            font-size: 22px;
            margin-bottom: 10px;
          }
          .email-body p {
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .email-body .otp {
            font-size: 28px;
            color: #27ae60;
            font-weight: bold;
            text-align: center;
            display: block;
            margin: 20px 0;
          }
          .email-footer {
            background-color: #2ecc71;
            color: #ffffff;
            text-align: center;
            padding: 15px;
            font-size: 14px;
          }
          .email-footer a {
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Healthy Food</h1>
            <p>Freshness Delivered!</p>
          </div>
          <div class="email-body">
            <h2>Hello,</h2>
            <p>We received a request to verify your account for Healthy Food. Please use the following OTP to complete the verification process:</p>
            <div class="otp">${otp}</div>
            <p>The OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
          </div>
          <div class="email-footer">
            <p>Thank you for choosing Healthy Food!</p>
            <p>
              <a href="https://healthyfood.com">Visit Our Website</a> | <a href="mailto:support@healthyfood.com">Contact Support</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  
    const mailOptions = {
      from: `"Healthy Food" <${process.env.EMAIL}>`, // Sender address
      to: recipientEmail, // Recipient address
      subject: "Your OTP for Healthy Food Account Verification",
      html: emailTemplate, // HTML email content
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${recipientEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  module.exports = { sendOtpEmail };
  