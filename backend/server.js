// ✅ src/backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createOrderHandler from "./api/create-order.js";
import { handleWebhook } from "./api/webhook.js"; // <-- Add webhook handler

// 🔥 Load .env before using any env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Allow CORS from frontend
const allowedOrigins = [
  "http://localhost:5173",                 // Local dev frontend
  "https://aalmiurduconference.com",       // Your production frontend domain
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Routes
app.post("/api/create-order", createOrderHandler);
app.post("/api/webhook", handleWebhook);
app.get("/", (_, res) => res.send("✅ API Server is Live"));

// ✅ Catch-all route (optional)
app.all("*", (req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Failed to start server:", err);
});
