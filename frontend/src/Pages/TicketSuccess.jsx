import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const TicketSuccess = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      const { data, error } = await supabase
        .from("ticket_orders")
        .select("*, events(title)")
        .eq("order_number", orderNumber)
        .single();

      if (error) {
        console.error("Order fetch error:", error);
        setError("Ticket order not found.");
      } else {
        setOrder(data);
      }

      setLoading(false);
    }

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  if (loading) return <p>Loading your ticket details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return null;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2 text-green-600">🎉 Order Successful!</h2>
      <p className="text-gray-700 mb-4">Thank you for your ticket purchase.</p>

      <div className="mb-4">
        <p><strong>Event:</strong> {order.events?.title || "Unknown Event"}</p>
        <p><strong>Order Number:</strong> {order.order_number}</p>
        <p><strong>Amount Paid:</strong> Rs. {order.amount}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 font-semibold ${order.status === 'paid' ? 'text-green-700' : 'text-yellow-600'}`}>
            {order.status.toUpperCase()}
          </span>
        </p>
      </div>

      {order.status !== 'paid' && (
        <p className="text-sm text-gray-500">
          Your payment is pending. We'll update your status shortly.
        </p>
      )}
    </div>
  );
};

export default TicketSuccess;
