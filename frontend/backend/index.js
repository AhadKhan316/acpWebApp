const express = require("express");
const cors = require("cors");
const createOrder = require("./routes/create-order");
const payproWebhook = require("./routes/webhook");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());