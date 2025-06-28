// ✅ backend/api/create-order.js

import axios from 'axios';
import dotenv from 'dotenv';
import supabase from '../utils/supabaseClient.js';

dotenv.config();

const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
};

// ✅ Named export instead of default
export async function handleCreateOrder(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: PayPro Auth
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET
    });

    const token = authRes.data?.data?.token;
    if (!token) throw new Error("PayPro Auth failed: No token returned.");

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;
    const payload = {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
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
      payload,
      { headers: { token } }
    );

    const invoiceUrl = invoiceRes?.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error("Missing invoice link. Response:", JSON.stringify(invoiceRes.data, null, 2));
      throw new Error("No invoice link returned from PayPro.");
    }

    // Step 3: Save to Supabase
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

    if (error) throw new Error("Supabase error: " + error.message);

    return res.status(200).json({
      success: true,
      invoiceUrl,
      orderNumber,
      supabaseId: data?.[0]?.id || null
    });

  } catch (err) {
    console.error("❌ Order Creation Failed:", err.message);
    if (err.response?.data) {
      console.error("💥 PayPro Error Response:", JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: "Order creation failed",
      message: err.message
    });
  }
}
// ✅ backend/api/create-order.js

import axios from 'axios';
import dotenv from 'dotenv';
import supabase from '../utils/supabaseClient.js';

dotenv.config();

const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
};

// ✅ Named export instead of default
export async function handleCreateOrder(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: PayPro Auth
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET
    });

    const token = authRes.data?.data?.token;
    if (!token) throw new Error("PayPro Auth failed: No token returned.");

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;
    const payload = {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
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
      payload,
      { headers: { token } }
    );

    const invoiceUrl = invoiceRes?.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error("Missing invoice link. Response:", JSON.stringify(invoiceRes.data, null, 2));
      throw new Error("No invoice link returned from PayPro.");
    }

    // Step 3: Save to Supabase
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

    if (error) throw new Error("Supabase error: " + error.message);

    return res.status(200).json({
      success: true,
      invoiceUrl,
      orderNumber,
      supabaseId: data?.[0]?.id || null
    });

  } catch (err) {
    console.error("❌ Order Creation Failed:", err.message);
    if (err.response?.data) {
      console.error("💥 PayPro Error Response:", JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: "Order creation failed",
      message: err.message
    });
  }
}
// ✅ backend/api/create-order.js

import axios from 'axios';
import dotenv from 'dotenv';
import supabase from '../utils/supabaseClient.js';

dotenv.config();

const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
};

// ✅ Named export instead of default
export async function handleCreateOrder(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: PayPro Auth
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET
    });

    const token = authRes.data?.data?.token;
    if (!token) throw new Error("PayPro Auth failed: No token returned.");

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;
    const payload = {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
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
      payload,
      { headers: { token } }
    );

    const invoiceUrl = invoiceRes?.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error("Missing invoice link. Response:", JSON.stringify(invoiceRes.data, null, 2));
      throw new Error("No invoice link returned from PayPro.");
    }

    // Step 3: Save to Supabase
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

    if (error) throw new Error("Supabase error: " + error.message);

    return res.status(200).json({
      success: true,
      invoiceUrl,
      orderNumber,
      supabaseId: data?.[0]?.id || null
    });

  } catch (err) {
    console.error("❌ Order Creation Failed:", err.message);
    if (err.response?.data) {
      console.error("💥 PayPro Error Response:", JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: "Order creation failed",
      message: err.message
    });
  }
}
// ✅ backend/api/create-order.js

import axios from 'axios';
import dotenv from 'dotenv';
import supabase from '../utils/supabaseClient.js';

dotenv.config();

const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
};

// ✅ Named export instead of default
export async function handleCreateOrder(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: PayPro Auth
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET
    });

    const token = authRes.data?.data?.token;
    if (!token) throw new Error("PayPro Auth failed: No token returned.");

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;
    const payload = {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
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
      payload,
      { headers: { token } }
    );

    const invoiceUrl = invoiceRes?.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error("Missing invoice link. Response:", JSON.stringify(invoiceRes.data, null, 2));
      throw new Error("No invoice link returned from PayPro.");
    }

    // Step 3: Save to Supabase
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

    if (error) throw new Error("Supabase error: " + error.message);

    return res.status(200).json({
      success: true,
      invoiceUrl,
      orderNumber,
      supabaseId: data?.[0]?.id || null
    });

  } catch (err) {
    console.error("❌ Order Creation Failed:", err.message);
    if (err.response?.data) {
      console.error("💥 PayPro Error Response:", JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: "Order creation failed",
      message: err.message
    });
  }
}
// ✅ backend/api/create-order.js

import axios from 'axios';
import dotenv from 'dotenv';
import supabase from '../utils/supabaseClient.js';

dotenv.config();

const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear()
  ].join('/');
};

// ✅ Named export instead of default
export async function handleCreateOrder(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: PayPro Auth
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET
    });

    const token = authRes.data?.data?.token;
    if (!token) throw new Error("PayPro Auth failed: No token returned.");

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;
    const payload = {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
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
      payload,
      { headers: { token } }
    );

    const invoiceUrl = invoiceRes?.data?.data?.[0]?.InvoiceLink;
    if (!invoiceUrl) {
      console.error("Missing invoice link. Response:", JSON.stringify(invoiceRes.data, null, 2));
      throw new Error("No invoice link returned from PayPro.");
    }

    // Step 3: Save to Supabase
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

    if (error) throw new Error("Supabase error: " + error.message);

    return res.status(200).json({
      success: true,
      invoiceUrl,
      orderNumber,
      supabaseId: data?.[0]?.id || null
    });

  } catch (err) {
    console.error("❌ Order Creation Failed:", err.message);
    if (err.response?.data) {
      console.error("💥 PayPro Error Response:", JSON.stringify(err.response.data, null, 2));
    }

    return res.status(500).json({
      error: "Order creation failed",
      message: err.message
    });
  }
}
