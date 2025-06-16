// /src/api/create-order/index.js
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY
);

const CLIENT_ID = process.env.VITE_PAYPRO_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_PAYPRO_CLIENT_SECRET;
const MERCHANT_ID = process.env.VITE_PAYPRO_MERCHANT_ID;

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, event_id, amount, customerName, customerEmail, customerMobile } = body;

    if (!user_id || !event_id || !amount) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Step 1: Authenticate with PayPro
    const authRes = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: CLIENT_ID,
      clientsecret: CLIENT_SECRET,
    });

    const token = authRes.data?.token;
    if (!token) throw new Error('Token not received from PayPro');

    // Step 2: Create Order
    const orderNumber = `INV-${Date.now()}`;
    const orderPayload = [
      { MerchantId: MERCHANT_ID },
      {
        OrderNumber: orderNumber,
        OrderAmount: amount.toString(),
        OrderDueDate: "31/12/2025", // You can also make this dynamic
        OrderType: "Service",
        IssueDate: new Date().toLocaleDateString('en-GB'),
        OrderExpireAfterSeconds: "0",
        CustomerName: customerName || "Guest",
        CustomerMobile: customerMobile || "",
        CustomerEmail: customerEmail || "",
        CustomerAddress: "",
      }
    ];

    const orderResponse = await axios.post("https://api.paypro.com.pk/v2/ppro/co", orderPayload, {
      headers: { token },
    });

    const invoiceUrl = orderResponse.data?.InvoiceLink;
    if (!invoiceUrl) throw new Error("Invoice link not returned from PayPro");

    // Step 3: Save to Supabase
    const { error: insertError } = await supabase.from("ticket_orders").insert([
      {
        user_id,
        event_id,
        order_number: orderNumber,
        amount,
        status: "pending",
        invoice_url: invoiceUrl,
      },
    ]);
    if (insertError) throw insertError;

    // Step 4: Return invoice link to frontend
    return new Response(JSON.stringify({ invoiceUrl }), { status: 200 });

  } catch (error) {
    console.error("Create order error:", error);
    return new Response(JSON.stringify({ error: "Could not create order" }), { status: 500 });
  }
}
