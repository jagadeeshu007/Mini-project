const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Signup - create user with unique userId
exports.signup = async (req, res) => {
  console.log("Signup request body:", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random userId

    const user = new User({ email, password: hashedPassword, userId });
    await user.save();

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.log("Signup error:", err);
    res.status(500).json({ message: "Server error during signup", error: err.message });
  }
};


// Login - authenticate user by email and password
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }); // FIXED: find by email, not userId

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      email: user.email,
      userId: user.userId,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// PATCH update user info (email and/or password)
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: "No data provided for update" });
  }

  const updateData = {};
  if (email) updateData.email = email;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
