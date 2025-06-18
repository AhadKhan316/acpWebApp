import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CLIENT_ID = process.env.PAYPRO_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPRO_CLIENT_SECRET;
const MERCHANT_ID = process.env.PAYPRO_MERCHANT_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { user_id, event_id, amount, customerName, customerEmail, customerMobile } = req.body;

  if (!user_id || !event_id || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Authenticate
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: CLIENT_ID,
      clientsecret: CLIENT_SECRET
    });

    const token = authRes.data?.token;
    if (!token) throw new Error("Token not received");

    // 2. Generate order
    const orderNumber = `INV-${Date.now()}`;
    const orderPayload = [
      { MerchantId: MERCHANT_ID },
      {
        OrderNumber: orderNumber,
        OrderAmount: amount.toString(),
        OrderDueDate: "31/12/2025",
        OrderType: "Service",
        IssueDate: new Date().toLocaleDateString("en-GB"),
        OrderExpireAfterSeconds: "0",
        CustomerName: customerName || "Guest",
        CustomerMobile: customerMobile || "",
        CustomerEmail: customerEmail || "",
        CustomerAddress: ""
      }
    ];

    const orderResponse = await axios.post('https://api.paypro.com.pk/v2/ppro/co', orderPayload, {
      headers: { token }
    });

    const invoiceUrl = orderResponse.data?.InvoiceLink;
    if (!invoiceUrl) {
      console.error("PayPro Response:", orderResponse.data);
      throw new Error("No invoice link");
    }

    // 3. Save in Supabase
    const { error: insertError } = await supabase.from("ticket_orders").insert([
      {
        user_id,
        event_id,
        order_number: orderNumber,
        amount,
        status: 'pending',
        invoice_url: invoiceUrl
      }
    ]);

    if (insertError) throw insertError;

    return res.status(200).json({ invoiceUrl });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ error: error.message || 'Payment failed' });
  }
}
