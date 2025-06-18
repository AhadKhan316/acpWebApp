// src/Pages/TicketBooking.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import axios from "axios";

const TicketBooking = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [user, setUser] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setError(error.message);
      else setEvent(data);
      setLoading(false);
    };

    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
    };

    fetchEvent();
    fetchUser();
  }, [id]);

  const handlePayment = async () => {
    if (!user || !event) return;
    setPaying(true);
    try {
      const response = await axios.post("/api/create-order", {
        user_id: user.id,
        event_id: event.id,
        amount: event.price * ticketCount,
        customerName: user.user_metadata?.full_name || "Guest",
        customerEmail: user.email,
        customerMobile: ""
      });

      const invoiceUrl = response.data?.invoiceUrl;
      if (!invoiceUrl) throw new Error("No invoice link");

      window.location.href = invoiceUrl;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again later.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (error || !event) return <p className="text-center text-red-600">{error || "Event not found."}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Tickets for {event.title}</h2>

      <p className="mb-2"><strong>Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Time:</strong> {event.time}</p>
      <p className="mb-4"><strong>Price per Ticket:</strong> Rs. {event.price}</p>

      <label className="block mb-2 font-medium">Number of Tickets</label>
      <input
        type="number"
        value={ticketCount}
        onChange={(e) => setTicketCount(Math.max(1, Math.min(10, parseInt(e.target.value))))}
        min={1}
        max={10}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {user ? (
        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          {paying ? "Processing..." : `Pay Rs. ${event.price * ticketCount} Now`}
        </button>
      ) : (
        <p className="text-center text-gray-600">Please sign in to purchase tickets.</p>
      )}
    </div>
  );
};

export default TicketBooking;
