import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createOrderHandler from "./api/create-order.js"; // Fixed path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post("/api/create-order", createOrderHandler);
app.get("/", (_, res) => res.send("API is running ✅"));

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});