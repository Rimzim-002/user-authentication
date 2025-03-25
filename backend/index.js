const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/dbconnection.js");
const { ROUTES } = require("./Routes/routesEnums.js"); // ✅ Import ROUTES constants
const authRoutes = require("./Routes/authroutes.js");
const adminRoutes = require("./Routes/adminroutes.js");
const userRoutes = require("./Routes/userroutes.js");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("./Models/user.js");

const app = express();

// ✅ Connect to DB first, then create Superadmin
connectDB().then(() => {
  console.log("✅ Connected to MongoDB");
  createSuperadmin();
});

// ✅ Middleware
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "userRole"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-mu-three-55.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, userRole");
  next();
});

// ✅ Test Route
app.get("/test", (req, res) => {
  res.json({ message: "Hello, API is working!" });
});

// ✅ Serve Uploads Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Use Routes with ROUTES Constants
app.use(ROUTES.AUTH, authRoutes);  // ✅ Using ROUTES.AUTH
app.use(ROUTES.ADMIN, adminRoutes);
// app.use(ROUTES.USER, userRoutes);

// ✅ Superadmin Creation
async function createSuperadmin() {
  try {
    const superadminExists = await User.findOne({ role: "superadmin" });

    if (!superadminExists) {
      const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10);
      const superadmin = new User({
        username: "Rimzim",
        email: "rimzim@gmail.com",
        password: hashedPassword,
        role: "superadmin",
      });

      await superadmin.save();
      console.log("✅ Superadmin created successfully!");
    } else {
      console.log("Superadmin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating superadmin:", error);
  }
}

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
