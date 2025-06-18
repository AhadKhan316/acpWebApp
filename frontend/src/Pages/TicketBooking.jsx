import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { supabase } from "../services/supabaseClient";

const TicketBooking = () => {
  const { id } = useParams();
  const session = useSession();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [customerMobile, setCustomerMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Event load error", error);
        setError("Event not found.");
      } else {
        setEvent(data);
      }
    }

    fetchEvent();
  }, [id]);

  const handlePayNow = async () => {
    if (!session?.user) {
      window.location.href = "/login";
      return;
    }

    if (ticketCount < 1 || ticketCount > 10) {
      setError("Ticket quantity must be between 1 and 10.");
      return;
    }

    if (!customerMobile || customerMobile.length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/create-order", {
        user_id: session.user.id,
        event_id: event.id,
        amount: ticketCount * event.price,
        customerName: session.user.user_metadata?.full_name || "Guest",
        customerEmail: session.user.email,
        customerMobile
      });

      const { invoiceUrl, orderNumber } = response.data;

      if (invoiceUrl && orderNumber) {
        // Save order number to localStorage or session
        localStorage.setItem('last_order_number', orderNumber);
        window.location.href = invoiceUrl;
      }
       else {
        console.error("Missing invoice URL:", response.data);
        throw new Error("No invoice link returned. Please try again.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err.response?.data?.error || err.message || "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <p className="text-gray-800 mb-2">Price per Ticket: Rs. {event.price}</p>

      <div className="flex items-center gap-4 mb-4">
        <label>Tickets:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={ticketCount}
          onChange={(e) =>
            setTicketCount(Math.max(1, Math.min(10, Number(e.target.value))))
          }
          className="border p-2 rounded w-24"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number (e.g. 03001234567)
        </label>
        <input
          type="tel"
          value={customerMobile}
          onChange={(e) => setCustomerMobile(e.target.value)}
          placeholder="03XXXXXXXXX"
          className="border p-2 rounded w-full"
        />
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handlePayNow}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default TicketBooking;
