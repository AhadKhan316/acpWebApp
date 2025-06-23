// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createOrderHandler from "./api/create-order.js";
import { handleWebhook } from "./api/webhook.js";

dotenv.config(); // Load environment variables early

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allow frontend CORS for dev and production
const allowedOrigins = [
  "http://localhost:5173",
  "https://aalmiurduconference.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.post("/api/create-order", createOrderHandler);
app.post("/api/webhook", handleWebhook); // Webhook route

app.get("/", (_, res) => res.send("✅ ACP API is running"));

app.use((err, req, res, next) => {
  console.error("🔥 Uncaught Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
