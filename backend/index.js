const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/dbconnection.js");
const authRoutes = require("./Routes/authroutes.js");
const adminRoutes = require("./Routes/adminroutes");
const  userRoutes= require("./Routes/userroutes.js")
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // ✅ Import bcrypt
const User = require("./Models/user.js"); // ✅ Import User model

const app = express();app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for images
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:3000"], // Allow frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization headers
  credentials: true, // Allow cookies and authentication headers
};
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.use(cors(corsOptions));


// Middleware
app.use(express.json());

// Connect to Database
connectDB().then(() => {
  console.log(" Connected to MongoDB");
  createSuperadmin(); // ✅ Call the function AFTER connecting to DB
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user",userRoutes)

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
      console.log(" Superadmin already exists.");
    }
  } catch (error) {
    console.error(" Error creating superadmin:", error);
  }
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
