const express = require("express");
const router = express.Router();
const { createPayProOrder } = require("../services/paypro");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

router.post("/buy-ticket", async (req, res) => {
  const { user_id, event_id, quantity, customer } = req.body;

  if (!user_id || !event_id || !quantity || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Step 1: Fetch event data
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("*")
    .eq("id", event_id)
    .single();

  if (eventError || !event) {
    return res.status(404).json({ error: "Event not found" });
  }

  const amount = quantity * parseFloat(event.price);

  try {
    // Step 2: Create order via PayPro
    const payproResponse = await createPayProOrder({
      orderNumber: `${user_id}-${Date.now()}`,
      amount,
      customer,
    });

    const invoiceId = payproResponse?.InvoiceNumber;
    const payUrl = payproResponse?.InvoiceLink;

    // Step 3: Save ticket order in Supabase
    const { error: insertError } = await supabase.from("ticket_orders").insert({
      user_id,
      event_id,
      quantity,
      amount_paid: amount,
      payment_status: "pending",
    });

    if (insertError) {
      console.error("Supabase insert failed", insertError);
    }

    return res.json({ invoiceId, payUrl });
  } catch (err) {
    console.error("Create Order Error", err.message);
    return res.status(500).json({ error: "Payment initiation failed" });
  }
});

module.exports = router;
