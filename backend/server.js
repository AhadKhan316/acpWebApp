import express from 'express';
import mysql from 'mysql2/promise'; // Using promise-based MySQL
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configure environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

// Initialize Express
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'https://vercel.com/ahad-khans-projects-f48d0f78/acp-web-app',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /mp3|wav|mp4|mov|avi/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only audio/video files are allowed!'));
  }
});

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sada_e_watan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Serve static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.post('/api/register', upload.single('audition_file'), async (req, res) => {
  try {
    const { full_name, id_number, email, phone } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded or invalid file type' 
      });
    }

    const filePath = `/uploads/${req.file.filename}`;
    
    const [result] = await pool.query(
      `INSERT INTO participants 
      (full_name, id_number, email, phone, audition_file) 
      VALUES (?, ?, ?, ?, ?)`,
      [full_name, id_number, email, phone, filePath]
    );

    res.json({ 
      success: true,
      message: 'Registration successful!',
      filePath 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed',
      details: err.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error' 
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${path.join(__dirname, 'uploads')}`);
});