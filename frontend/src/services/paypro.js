// services/paypro.js
require('dotenv').config();
const axios = require('axios');
const { PAYPRO_CLIENT_ID, PAYPRO_CLIENT_SECRET, PAYPRO_MERCHANT_ID } = process.env;

async function getPayProToken() {
  const res = await axios.post("https://api.paypro.com.pk/v2/ppro/auth", {
    clientid: PAYPRO_CLIENT_ID,
    clientsecret: PAYPRO_CLIENT_SECRET,
  });
  return res.data?.token;
}

async function createPayProOrder({ orderNumber, amount, customer }) {
  const token = await getPayProToken();
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 1);

  const formatDate = (d) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

  const payload = [
    { MerchantId: PAYPRO_MERCHANT_ID },
    {
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(dueDate),
      OrderType: "Service",
      IssueDate: formatDate(today),
      OrderExpireAfterSeconds: "0",
      CustomerName: customer.name || "Customer",
      CustomerMobile: customer.mobile || "",
      CustomerEmail: customer.email || "",
      CustomerAddress: customer.address || "",
    },
  ];

  const res = await axios.post("https://demoapi.paypro.com.pk/v2/ppro/co", payload, {
    headers: { token },
  });

  return res.data;
}

module.exports = { createPayProOrder };
