const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/dbconnection.js");
const userRoutes = require("./Routes/userroutes.js");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // ✅ Import bcrypt
const User = require("./Models/user.js"); // ✅ Import User model

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to Database
connectDB().then(() => {
  console.log("🔥 Connected to MongoDB");
  createSuperadmin(); // ✅ Call the function AFTER connecting to DB
});

// Routes
app.use("/api/users", userRoutes);

// SUPER_ADMIN Creation
async function createSuperadmin() {
  try {
    const superadminExists = await User.findOne({ role: "superadmin" });

    if (!superadminExists) {
      const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10); // ✅ Hash password

      const superadmin = new User({
        username: "Rimzim",
        email: "rimzim@gmail.com",
        password: hashedPassword, // ✅ Store hashed password
        role: "superadmin",
      });

      await superadmin.save();
      console.log("✅ Superadmin created successfully!");
    } else {
      console.log("⚡ Superadmin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating superadmin:", error);
  }
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
