import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load .env first

// Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Destructure required credentials
const {
  PAYPRO_CLIENT_ID,
  PAYPRO_CLIENT_SECRET,
  PAYPRO_MERCHANT_ID
} = process.env;

// Validate .env essentials
if (!PAYPRO_CLIENT_ID || !PAYPRO_CLIENT_SECRET || !PAYPRO_MERCHANT_ID) {
  console.error("❌ Missing PayPro credentials in .env file.");
  process.exit(1);
}

// Format date as DD/MM/YYYY
const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requiredFields = ['user_id', 'event_id', 'amount'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      missingFields
    });
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

  try {
    console.log("🔐 Step 1: Authenticating with PayPro...");
    const authResponse = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      client_id: PAYPRO_CLIENT_ID,
      client_secret: PAYPRO_CLIENT_SECRET
    });

    const token = authResponse?.data?.data?.token;
    if (!token) {
      console.error("❌ Token missing from auth response:", authResponse.data);
      throw new Error("PayPro Auth failed. Token not received.");
    }

    console.log("✅ Auth Success. Token received.");

    // Step 2: Invoice creation
    const orderNumber = `INV-${Date.now()}`;
    const issueDate = formatDate();
    const dueDate = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)); // +1 day

    const payload = {
      MerchantId: PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: dueDate,
      OrderType: "Service",
      IssueDate: issueDate,
      OrderExpireAfterSeconds: "3600",
      CustomerName: customerName,
      CustomerMobile: customerMobile,
      CustomerEmail: customerEmail,
      CustomerAddress: customerAddress
    };

    console.log("📦 Step 2: Creating Invoice with payload:", payload);

    const invoiceResponse = await axios.post(
      'https://api.paypro.com.pk/v2/ppro/co',
      payload,
      {
        headers: {
          token
        }
      }
    );

    const invoiceUrl = invoiceResponse?.data?.data?.[0]?.InvoiceLink;

    if (!invoiceUrl) {
      console.error("❌ InvoiceLink missing. Full response:", invoiceResponse.data);
      throw new Error("No invoice URL returned from PayPro.");
    }

    console.log("✅ Invoice Created. Saving to Supabase...");

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

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log("✅ Order saved. Returning invoice URL.");
    return res.status(200).json({
      success: true,
      orderNumber,
      invoiceUrl,
      supabaseId: data[0]?.id
    });

  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    if (err.response?.data) {
      console.error("💥 PayPro API Error:", JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: 'Order creation failed',
      message: err.response?.status === 406
        ? 'PayPro rejected the invoice request (HTTP 406). Check your payload and merchant ID.'
        : err.message
    });
  }
}
