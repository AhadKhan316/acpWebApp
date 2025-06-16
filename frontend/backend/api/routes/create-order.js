const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await supabase.from('orders').insert([{
  user_id: req.body.userId,
  event_id: req.body.eventId,
  order_number: generatedOrderNumber,
  amount: req.body.totalAmount,
  invoice_link: invoiceUrl,
  status: 'pending'
}]);
