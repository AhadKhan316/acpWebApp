import express from "express";
import cors from "cors";
import createOrderHandler from "./api/create-order.js";
import dotenv from 'dotenv';

// 🔥 Always load env first!
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS setup for frontend <-> backend communication
app.use(cors({
  origin: "http://localhost:5173", // Replace with frontend domain in production
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Routes
app.post("/api/create-order", createOrderHandler);
app.get("/", (_, res) => res.send("API is running ✅"));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});
