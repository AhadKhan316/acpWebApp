// ✅ 4. src/backend/api/webhook.js
import supabase from '../utils/supabaseClient.js';

export async function handleWebhook(req, res) {
  const payload = req.body;

  // Example structure: { OrderNumber: 'Test-909', Status: 'Paid' }
  const { OrderNumber, Status } = payload;

  if (!OrderNumber || !Status) return res.status(400).json({ error: 'Missing data' });

  const { error } = await supabase
    .from('ticket_orders')
    .update({ status: Status.toLowerCase() })
    .eq('order_number', OrderNumber);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true });
}
