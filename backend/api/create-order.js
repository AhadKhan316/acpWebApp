import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Extract PayPro credentials
const {
  PAYPRO_CLIENT_ID: CLIENT_ID,
  PAYPRO_CLIENT_SECRET: CLIENT_SECRET,
  PAYPRO_MERCHANT_ID: MERCHANT_ID
} = process.env;

// Helper to format date as DD/MM/YYYY
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
    return res.status(405).json({ error: 'Method not allowed', allowedMethods: ['POST'] });
  }

  // Validate required body fields
  const requiredFields = ['user_id', 'event_id', 'amount'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    console.warn('⚠ Missing fields:', missingFields);
    return res.status(400).json({
      error: 'Missing required fields',
      missingFields,
      receivedBody: req.body
    });
  }

  const {
    user_id,
    event_id,
    amount,
    customerName = 'Guest',
    customerEmail = '',
    customerMobile = ''
  } = req.body;

  try {
    console.log('✅ Step 1: Authenticating with PayPro...');
    console.log('🔑 CLIENT_ID:', CLIENT_ID);
    console.log('🔑 CLIENT_SECRET:', CLIENT_SECRET);

    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });

    console.log('✅ Auth Response:', authRes.data);

    const token = authRes.data?.data?.token;
    if (!token) {
      throw new Error("Authentication failed: Token missing from PayPro response.");
    }

    // Prepare order payload
    const orderNumber = `INV-${Date.now()}`;
    const issueDate = formatDate();
    const dueDate = formatDate(new Date().setFullYear(new Date().getFullYear() + 1));

    const orderPayload = {
      MerchantId: MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: dueDate,
      OrderType: "Service",
      IssueDate: issueDate,
      OrderExpireAfterSeconds: "0",
      CustomerName: customerName,
      CustomerMobile: customerMobile,
      CustomerEmail: customerEmail,
      CustomerAddress: ""
    };

    console.log('✅ Step 2: Creating PayPro Invoice...');
    console.log('📦 Order Payload:', orderPayload);

    const orderRes = await axios.post(
      'https://api.paypro.com.pk/v2/ppro/co',
      orderPayload,
      {
        headers: {
          token
        }
      }
    );

    console.log('✅ PayPro Response:', orderRes.data);

    const invoiceUrl = orderRes.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error('❌ InvoiceLink missing. Full response:', JSON.stringify(orderRes.data, null, 2));
      throw new Error("No invoice URL returned from PayPro.");
    }

    // Save to Supabase
    console.log('✅ Step 3: Saving to Supabase...');
    const { data, error } = await supabase
      .from('ticket_orders')
      .insert([{
        user_id,
        event_id,
        order_number: orderNumber,
        amount,
        status: 'pending',
        invoice_url: invoiceUrl,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('✅ Step 4: Order successfully saved:', data[0]);

    return res.status(200).json({
      success: true,
      orderNumber,
      invoiceUrl,
      supabaseId: data[0]?.id
    });

  } catch (error) {
    console.error('❌ Order creation failed:', error.message);
    console.error(error.stack);
    return res.status(500).json({
      error: 'Order creation failed',
      message: error.message
    });
  }
}
