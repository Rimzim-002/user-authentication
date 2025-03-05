const express = require('express');
require('dotenv').config();
const connectDB = require('./Config/dbconnection.js');
const userRoutes = require('./Routes/userroutes.js');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT ||5001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
