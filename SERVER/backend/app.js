const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const Property = require("./models/Property");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploads folder statically for images
app.use("/uploads", express.static("uploads"));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Enable Mongoose debug logging
mongoose.set("debug", true);

// Handle /api/properties/add endpoint with file upload
app.post("/api/properties/add", upload.single("image"), async (req, res) => {
  try {
    // Parse JSON data
    let data;
    try {
      data = JSON.parse(req.body.data);
    } catch (parseError) {
      throw new Error(`Invalid JSON data: ${parseError.message}`);
    }
    const imagePath = req.file ? req.file.path : null;

    // Log received data
    console.log("Received Data:", data);
    console.log("Image Path:", imagePath);

    // Validate required fields
    const requiredFields = ["userId", "userName", "email"];
    for (const field of requiredFields) {
      if (!data[field] || typeof data[field] !== "string" || data[field].trim() === "") {
        throw new Error(`Invalid or missing required field: ${field}`);
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    // Create new property
    const property = new Property({
      ...data,
      imagePath,
    });

    // Save to MongoDB with explicit error handling
    console.log("Attempting to save property...");
    const savedProperty = await property.save();
    console.log("Property saved to MongoDB:", savedProperty._id);

    res.status(201).json({ message: "Property added successfully", property: savedProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(400).json({ error: "Failed to add property", details: error.message });
  }
});

// Mount routes
app.use("/api/properties", propertyRoutes);
app.use("/api", authRoutes);

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/realestate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Log successful connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB reconnected");
});

// Log disconnection events
mongoose.connection.on("disconnected", () => {
  console.error("MongoDB disconnected");
});

module.exports = app;