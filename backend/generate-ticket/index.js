import QRCode from 'qrcode';
import { useSession } from "@supabase/auth-helpers-react";

// Setup Supabase
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_SERVICE_KEY
  );
  

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { order_number } = req.body;
  if (!order_number) return res.status(400).json({ error: 'Missing order_number' });

  try {
    // 1. Get the ticket order
    const { data: order, error } = await supabase
      .from('ticket_orders')
      .select('*')
      .eq('order_number', order_number)
      .single();

    if (error || !order) throw new Error('Order not found');

    if (order.status !== 'paid') {
      return res.status(400).json({ error: 'Ticket not paid yet' });
    }

    // 2. Generate QR Code
    const qrData = `Order: ${order.order_number} | Event: ${order.event_id} | Email: ${order.customer_email}`;
    const qrImage = await QRCode.toDataURL(qrData);

    // 3. Upload to Supabase Storage
    const base64Data = qrImage.split(',')[1]; // remove `data:image/png;base64,`
    const fileBuffer = Buffer.from(base64Data, 'base64');
    const fileName = `tickets/${order.order_number}.png`;

    const { data: uploadRes, error: uploadErr } = await supabase.storage
      .from('tickets')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (uploadErr) throw uploadErr;

    // 4. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('tickets')
      .getPublicUrl(fileName);

    return res.status(200).json({ ticketUrl: publicUrlData.publicUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Ticket generation failed' });
  }
}
