// backend/api/webhook.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Supabase client setup (Service Role Key for secure update access)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Webhook Handler
export default async function webhookHandler(req, res) {
  // 🛡️ Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;

    console.log("📦 Webhook received:", payload);

    const { OrderNumber, Status } = payload;

    // ✅ Check required fields
    if (!OrderNumber || !Status) {
      console.warn("⚠️ Missing fields in webhook:", payload);
      return res.status(400).json({ error: "Missing OrderNumber or Status" });
    }

    const normalizedStatus = Status.toLowerCase();

    // ✅ Update Supabase ticket_orders
    const { error } = await supabase
      .from("ticket_orders")
      .update({ payment_status: normalizedStatus })
      .eq("order_number", OrderNumber);

    if (error) {
      console.error("❌ Supabase update failed:", error.message);
      return res.status(500).json({ error: "Database update failed" });
    }

    console.log(`✅ Order '${OrderNumber}' updated to '${normalizedStatus}'`);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(500).json({
      error: "Webhook handler failed",
      message: err.message
    });
  }
}
