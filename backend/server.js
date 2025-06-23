// ✅ backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import createOrderHandler from "./api/create-order.js";
import { handleWebhook } from "./api/webhook.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Create express app
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Enable JSON parsing for incoming requests
app.use(express.json());

// ✅ Allow CORS for both local and production use
app.use(
  cors({
    origin: ["http://localhost:5173", "https://aalmiurduconference.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ API Routes
app.get("/", (_, res) => res.send("✅ API is running"));
app.post("/api/create-order", createOrderHandler);
app.post("/api/webhook", handleWebhook);

// ✅ Serve frontend app (SPA) from /frontend/dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendBuildPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendBuildPath));

// ✅ Catch-all: serve index.html for any non-API route (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});
