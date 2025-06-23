import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Initialize Supabase with env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Utility: Format date as DD/MM/YYYY
function formatDate(date = new Date()) {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
}

// ✅ Express-compatible handler
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    user_id,
    event_id,
    amount,
    customerName = 'Guest',
    customerEmail = '',
    customerMobile = '',
    customerAddress = ''
  } = req.body;

  if (!user_id || !event_id || !amount) {
    return res.status(400).json({ error: 'Missing required fields: user_id, event_id, amount' });
  }

  try {
    // ✅ Step 1: Get PayPro token
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET
    });

    const token = authRes?.data?.data?.token;
    if (!token) throw new Error('Failed to retrieve PayPro token');

    // ✅ Step 2: Generate invoice payload
    const orderNumber = `INV-${Date.now()}`;
    const invoicePayload = {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // +1 day
      OrderType: "Service",
      IssueDate: formatDate(),
      OrderExpireAfterSeconds: "3600",
      CustomerName: customerName,
      CustomerMobile: customerMobile,
      CustomerEmail: customerEmail,
      CustomerAddress: customerAddress
    };

    const invoiceRes = await axios.post(
      'https://api.paypro.com.pk/v2/ppro/co',
      invoicePayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      }
    );

    const invoiceUrl = invoiceRes?.data?.data?.[0]?.InvoiceLink;

    if (!invoiceUrl) {
      console.error('⚠️ Missing invoice link. Response:', JSON.stringify(invoiceRes.data, null, 2));
      throw new Error('No invoice link returned. Please try again.');
    }

    // ✅ Step 3: Insert ticket order into Supabase
    const { data, error } = await supabase
      .from('ticket_orders')
      .insert([{
        user_id,
        event_id,
        order_number: orderNumber,
        amount_paid: parseFloat(amount),
        payment_status: 'pending',
        invoice_url: invoiceUrl,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return res.status(200).json({
      success: true,
      orderNumber,
      invoiceUrl,
      supabaseId: data?.[0]?.id || null
    });

  } catch (err) {
    console.error('❌ Order creation failed:', err.message);
    if (err.response?.data) {
      console.error('💥 PayPro API Error:', JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: 'Order creation failed',
      message: err.response?.status === 406
        ? 'PayPro rejected the invoice request (HTTP 406). Check your payload or merchant ID.'
        : err.message || 'Unexpected error'
    });
  }
}
