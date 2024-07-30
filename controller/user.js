const express = require("express");
const Rat = require("../model/rat");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.subash;
const authenticate = require("../middleware/authMiddleware");
const User = require("../model/user");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({ message: "Login successful", id: user._id, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update user route
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.status(403).send("You are not authorized to update this user");
    }

    const updates = {};
    if (username) updates.username = username;
    if (password) updates.password = password;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
