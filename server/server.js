import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const isBlank = (v) => typeof v !== "string" || v.trim() === "";

// POST /api/signup  { f_name, l_name, username, password }
app.post("/api/signup", async (req, res) => {
  try {
    const { f_name, l_name, username, password } = req.body;

    if ([f_name, l_name, username, password].some(isBlank)) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Username already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ f_name, l_name, username, password: hashed });

    return res.status(201).json({
      success: true,
      message: `User "${user.username}" created successfully.`,
    });
  } catch (err) {
    // Duplicate key from the unique index (two signups racing for one username)
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Username already exists." });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

// POST /api/login  { username, password }
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (isBlank(username) || isBlank(password)) {
      return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(404).json({ success: false, message: "Username does not exist." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }

    return res.status(200).json({
      success: true,
      message: `Login successful. Welcome, ${user.f_name} ${user.l_name}!`,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
