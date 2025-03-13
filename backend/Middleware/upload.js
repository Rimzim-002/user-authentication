const multer = require("multer");
const path = require("path");

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

// ✅ Initialize Multer for Multiple Files
const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

module.exports = upload;
