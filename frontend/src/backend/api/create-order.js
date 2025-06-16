// ✅ 3. src/backend/api/create-order.js
import { getPayProToken, createPayProOrder } from '../utils/paypro.js';
import supabase from '../utils/supabaseClient.js';

export async function handleCreateOrder(req, res) {
  const {
    orderNumber,
    amount,
    dueDate,
    customerName,
    customerEmail,
    customerMobile,
    customerAddress,
    eventId,
    userId,
  } = req.body;

  const token = await getPayProToken();
  if (!token) return res.status(500).json({ error: 'Unable to authenticate with PayPro' });

  const orderPayload = [
    {
      MerchantId: process.env.PAYPRO_MERCHANT_ID,
    },
    {
      OrderNumber: orderNumber,
      OrderAmount: amount.toString(),
      OrderDueDate: dueDate,
      OrderType: 'Service',
      IssueDate: new Date().toLocaleDateString('en-GB'),
      OrderExpireAfterSeconds: '0',
      CustomerName: customerName,
      CustomerMobile: customerMobile,
      CustomerEmail: customerEmail,
      CustomerAddress: customerAddress,
    },
  ];

  const payproRes = await createPayProOrder(orderPayload, token);
  const invoiceURL = payproRes?.InvoiceURL;

  if (!invoiceURL) return res.status(500).json({ error: 'Could not retrieve invoice URL' });

  await supabase.from('ticket_orders').insert({
    user_id: userId,
    event_id: eventId,
    amount,
    order_number: orderNumber,
    invoice_url: invoiceURL,
    status: 'pending',
  });

  res.json({ invoiceURL });
}