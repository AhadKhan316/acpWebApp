// backend/api/create-order.js (Node.js + Express)
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/api/create-order', async (req, res) => {
  const {
    name, email, phone, tickets, eventTitle, amount
  } = req.body;

  try {
    // Step 1: Get Auth Token
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: 'YOUR_CLIENT_ID',
      clientsecret: 'YOUR_CLIENT_SECRET',
    });

    const token = authRes.data?.token;
    if (!token) throw new Error('Auth failed');

    // Step 2: Create Order
    const orderData = [
      { MerchantId: 'YOUR_MERCHANT_USERNAME' },
      {
        OrderNumber: `EVT-${Date.now()}`,
        OrderAmount: `${amount}`,
        OrderDueDate: new Date().toLocaleDateString('en-GB'),
        OrderType: 'Event',
        IssueDate: new Date().toLocaleDateString('en-GB'),
        OrderExpireAfterSeconds: "0",
        CustomerName: name,
        CustomerMobile: phone || '',
        CustomerEmail: email,
        CustomerAddress: '',
      }
    ];

    const orderRes = await axios.post(
      'https://api.paypro.com.pk/v2/ppro/co',
      orderData,
      { headers: { token } }
    );

    const invoiceURL = orderRes.data?.InvoiceUrl;
    if (!invoiceURL) throw new Error('No invoice URL returned');

    res.json({ invoice_url: invoiceURL });

  } catch (error) {
    console.error('PayPro Error:', error.message);
    res.status(500).json({ message: 'Failed to create order. Try again.' });
  }
});

module.exports = router;
