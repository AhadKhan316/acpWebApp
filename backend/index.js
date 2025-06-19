// ✅ 5. src/backend/index.js (API Gateway Entry)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleCreateOrder } from './api/create-order.js';
import { handleWebhook } from './api/webhook.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/create-order', handleCreateOrder);
app.post('/api/webhook', handleWebhook);

app.listen(PORT, () => {
  console.log(`🚀 API running at https://urduconference.com:${PORT}`);
});
