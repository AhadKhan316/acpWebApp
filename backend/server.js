// ✅ backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createOrderHandler from "./api/create-order.js";
import { handleWebhook } from "./api/webhook.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS configuration (for both local and production domains)
app.use(cors({
  origin: ["http://localhost:5173", "https://aalmiurduconference.com"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ JSON parser for incoming requests
app.use(express.json());

// ✅ Health check route
app.get("/", (_, res) => res.send("✅ API is running"));

// ✅ PayPro invoice creation endpoint
app.post("/api/create-order", createOrderHandler);

// ✅ PayPro webhook callback endpoint
app.post("/api/webhook", handleWebhook);

// ✅ Catch-all error handler
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
