// backend/api/webhook.js
import supabase from '../utils/supabaseClient.js';

export async function handleWebhook(req, res) {
  try {
    const payload = req.body;

    console.log("📦 Received PayPro webhook:", payload);

    const { OrderNumber, Status } = payload;

    if (!OrderNumber || !Status) {
      console.warn("⚠️ Webhook missing required fields:", payload);
      return res.status(400).json({ error: "Missing OrderNumber or Status" });
    }

    // Normalize status (e.g., Paid, Expired, Cancelled, etc.)
    const statusLower = Status.toLowerCase();

    // Update ticket_orders record in Supabase
    const { error } = await supabase
      .from("ticket_orders")
      .update({ payment_status: statusLower })
      .eq("order_number", OrderNumber);

    if (error) {
      console.error("❌ Supabase update failed:", error);
      return res.status(500).json({ error: "Database update failed" });
    }

    console.log(`✅ Order ${OrderNumber} status updated to '${statusLower}'`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    res.status(500).json({ error: "Webhook handler failed", message: err.message });
  }
}
