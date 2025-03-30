const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../MiddleWare");

// Register Route
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in." });
    }

    const newUser = new User({ email, password, username });
    await newUser.save(); // Password is hashed in the schema middleware

    req.session.userId = newUser._id;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Error saving session." });
      }
      res.status(201).json({ message: "User registered successfully", user: { email, username } });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Error creating user. Please try again later." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password. Please try again." });
    }

    req.session.userId = user._id;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Error saving session." });
      }
      res.status(200).json({ message: "Login successful", user: { email: user.email, username: user.username } });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error logging in. Please try again later." });
  }
});

// Get Current User Route
router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data." });
  }
});

// Logout Route
router.post("/logout", isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ error: "Error logging out. Please try again later." });
    }
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully." });
  });
});

// Protected Example Route
router.get("/protected", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "You are authorized to access this route!" });
});

router.get("/user",async(req,res)=>{
  try{
    const user=await User.find();
    res.status(200).json(user);
  }
  catch(error){
    res.status(400).json({error})
  }
})
module.exports = router;
