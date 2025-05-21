const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/authControllers");
const User = require("../models/userModel");

// Signup and login routes
router.post("/signup", signup);
router.post("/login", login);

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// PATCH update user (email and/or password)
router.patch("/users/:id", updateUser);

// DELETE user
router.delete("/users/:id", deleteUser);

module.exports = router;
