const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { sendOtpEmail } = require("./SendEmail/Email");
const bcrypt = require("bcryptjs");

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp; // Save OTP to the user document
    await user.save();

    await sendOtpEmail(email, otp);
    console.log(`Generated OTP: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending OTP." });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.otp = ""; // Clear OTP after verification
    await user.save();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error verifying OTP." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { newPassword, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.password=newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing password." });
  }
});

module.exports = router;
