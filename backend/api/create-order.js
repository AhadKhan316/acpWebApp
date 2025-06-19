import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const {
  PAYPRO_CLIENT_ID: CLIENT_ID,
  PAYPRO_CLIENT_SECRET: CLIENT_SECRET,
  PAYPRO_MERCHANT_ID: MERCHANT_ID
} = process.env;

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

  const requiredFields = ['user_id', 'event_id', 'amount'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
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
    console.log('Authenticating with PayPro...');
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });

    const token = authRes.data?.data?.token;
    if (!token) throw new Error("Authentication failed: No token received from PayPro");

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

    console.log('Creating PayPro invoice...');
    const orderRes = await axios.post(
      'https://api.paypro.com.pk/v2/ppro/co',
      orderPayload,
      { headers: { token } }
    );
    const invoiceUrl = orderRes.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error('Missing invoice URL. Full response:', orderRes.data);
      throw new Error("No invoice URL received from PayPro");
    }

    console.log('Saving order to Supabase...');
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
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('✅ Order created successfully:', orderNumber);

    return res.status(200).json({
      success: true,
      orderNumber,
      invoiceUrl,
      rawPaypro: orderRes.data,
      supabaseId: data[0]?.id
    });
    

  } catch (error) {
    console.error('❌ Order creation failed:', error.message);
    return res.status(500).json({
      error: 'Order creation failed',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
}
