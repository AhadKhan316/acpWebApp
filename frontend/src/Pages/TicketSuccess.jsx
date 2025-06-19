import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const TicketSuccess = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("ticket_orders")
          .select("*, events(title)")
          .eq("order_number", orderNumber)
          .single();

        if (error || !data) {
          console.error("Order fetch error:", error);
          setError("Ticket order not found or invalid order number.");
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrder();
    } else {
      setError("No order number provided in URL.");
      setLoading(false);
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Loading your ticket details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2 text-green-600">🎉 Order Successful!</h2>
      <p className="text-gray-700 mb-4">Thank you for your ticket purchase.</p>

      <div className="mb-4 space-y-1">
        <p>
          <strong>Event:</strong> {order.events?.title || "Unknown Event"}
        </p>
        <p>
          <strong>Order Number:</strong> {order.order_number}
        </p>
        <p>
          <strong>Amount Paid:</strong> Rs. {order.amount}
        </p>
        <p>
          <strong>Status:</strong>
          <span
            className={`ml-2 font-semibold ${
              order.status === "paid"
                ? "text-green-700"
                : "text-yellow-600"
            }`}
          >
            {order.status.toUpperCase()}
          </span>
        </p>
      </div>

      {order.status !== "paid" && (
        <div className="bg-yellow-50 text-yellow-700 border border-yellow-300 p-3 rounded text-sm">
          Your payment is <strong>pending</strong>. If your status doesn’t update in a few minutes,
          please contact support or check back later.
        </div>
      )}

      <div className="mt-6 flex gap-4 justify-end">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back to Events
        </Link>
        <Link
          to="/my-tickets"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View My Tickets
        </Link>
      </div>
    </div>
  );
};

export default TicketSuccess;
