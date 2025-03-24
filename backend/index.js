const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/dbconnection.js");
const authRoutes = require("./Routes/authroutes.js");
const adminRoutes = require("./Routes/adminroutes");
const  userRoutes= require("./Routes/userroutes.js")
const cors = require("cors");
const path= require("path")
const bcrypt = require("bcryptjs"); // ✅ Import bcrypt
const User = require("./Models/user.js"); // ✅ Import User model

const app = express();
connectDB().then(() => {
  console.log(" Connected to MongoDB");
  createSuperadmin(); // ✅ Call the function AFTER connecting to DB
});
app.use(express.json());
const corsOptions = {
  origin: "*", // Allow frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization" ,"userRole"], // Allow Authorization headers
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","https://frontend-mu-three-55.vercel.app"); // Allow all origins for images
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization,userRole");
  next();
});
// CORS Configuration


app.get("/test",(req,res)=>{
  res.json({message:"hellow"})
})



// Middleware

// Connect to Database


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
