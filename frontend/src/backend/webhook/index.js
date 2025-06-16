import { createClient } from '@supabase/supabase-js';

// Supabase client setup
const supabase = createClient(
  'https://<your-project-id>.supabase.co', // Replace with your Supabase URL
  'your-supabase-service-role-key'         // Keep this private
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { OrderNumber, Status } = req.body;

    if (!OrderNumber || !Status) {
      return res.status(400).json({ error: 'Missing OrderNumber or Status' });
    }

    // Update order status in Supabase
    const { error } = await supabase
      .from('ticket_orders')
      .update({ status: Status.toLowerCase() })
      .eq('order_number', OrderNumber);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Webhook failed' });
  }
}
