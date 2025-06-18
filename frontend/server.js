// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createOrderHandler from "./backend/api/create-order.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ API Route
app.post("/api/create-order", createOrderHandler);

// ✅ Fallback (optional)
app.get("/", (_, res) => res.send("API is running ✅"));

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
