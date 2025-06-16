import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Supabase client setup
const supabase = createClient(
  'https://<your-project-id>.supabase.co', // Replace with your Supabase URL
  'your-supabase-service-role-key'         // Keep this private
);

// PayPro credentials
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const MERCHANT_ID = 'your-merchant-id'; // You received this from PayPro

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { user_id, event_id, amount, customerName, customerEmail, customerMobile } = req.body;

  if (!user_id || !event_id || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: Authenticate with PayPro
    const authResponse = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: CLIENT_ID,
      clientsecret: CLIENT_SECRET
    });

    const token = authResponse.data?.token;
    if (!token) throw new Error('No token from PayPro');

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;

    const orderPayload = [
      { MerchantId: MERCHANT_ID },
      {
        OrderNumber: orderNumber,
        OrderAmount: amount.toString(),
        OrderDueDate: "31/12/2025",
        OrderType: "Service",
        IssueDate: new Date().toLocaleDateString('en-GB'),
        OrderExpireAfterSeconds: "0",
        CustomerName: customerName || "Guest",
        CustomerMobile: customerMobile || "",
        CustomerEmail: customerEmail || "",
        CustomerAddress: ""
      }
    ];

    const orderRes = await axios.post('https://api.paypro.com.pk/v2/ppro/co', orderPayload, {
      headers: { token }
    });

    const invoiceUrl = orderRes.data?.InvoiceLink;
    if (!invoiceUrl) throw new Error('No invoice link from PayPro');

    // Step 3: Save Order in Supabase
    const { error: insertError } = await supabase.from('ticket_orders').insert([
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

    // Step 4: Return invoice link
    return res.status(200).json({ invoiceUrl });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ error: 'Could not create order' });
  }
}
