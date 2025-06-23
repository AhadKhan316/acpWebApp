// ✅ src/backend/api/webhook.js
import supabase from '../utils/supabaseClient.js';

export async function handleWebhook(req, res) {
  try {
    const payload = req.body;

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid payload format' });
    }

    const { OrderNumber, Status, ConnectPayId, PaidAmount } = payload;

    if (!OrderNumber || !Status) {
      return res.status(400).json({ error: 'Missing required fields: OrderNumber or Status' });
    }

    console.log("📥 Received webhook for Order:", OrderNumber, "Status:", Status);

    const updates = {
      payment_status: Status.toLowerCase(), // e.g., 'paid' or 'unpaid'
      updated_at: new Date().toISOString()
    };

    if (ConnectPayId) updates.transaction_id = ConnectPayId;
    if (PaidAmount) updates.amount_paid = parseFloat(PaidAmount);

    const { error } = await supabase
      .from('ticket_orders')
      .update(updates)
      .eq('order_number', OrderNumber);

    if (error) {
      console.error("❌ Supabase update error:", error.message);
      return res.status(500).json({ error: 'Failed to update ticket order' });
    }

    return res.status(200).json({ success: true, message: 'Payment status updated' });

  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(500).json({ error: 'Webhook internal error' });
  }
}
