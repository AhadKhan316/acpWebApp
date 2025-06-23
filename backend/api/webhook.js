// ✅ backend/api/webhook.js

import supabase from '../utils/supabaseClient.js';

export async function handleWebhook(req, res) {
  try {
    // Step 1: Read and validate payload
    const payload = req.body;

    console.log("📦 Received PayPro webhook:", JSON.stringify(payload, null, 2));

    const { OrderNumber, Status } = payload;

    if (!OrderNumber || !Status) {
      console.warn("⚠️ Webhook missing OrderNumber or Status:", payload);
      return res.status(400).json({ error: "Missing required fields in webhook" });
    }

    const normalizedStatus = Status.toLowerCase();

    // Step 2: Update ticket_orders in Supabase
    const { error } = await supabase
      .from("ticket_orders")
      .update({ payment_status: normalizedStatus })
      .eq("order_number", OrderNumber);

    if (error) {
      console.error("❌ Supabase update error:", error.message);
      return res.status(500).json({ error: "Supabase update failed" });
    }

    console.log(`✅ Webhook success: Order '${OrderNumber}' updated to '${normalizedStatus}'`);
    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ Webhook Handler Error:", err.message);
    res.status(500).json({ error: "Webhook handler failed", message: err.message });
  }
}
