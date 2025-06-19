import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { supabase } from "../services/supabaseClient";

const TicketBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSession();

  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [customerMobile, setCustomerMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
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
    };

    fetchEvent();
  }, [id]);

  const validateForm = () => {
    if (!session?.user) {
      navigate("/login");
      return false;
    }

    if (ticketCount < 1 || ticketCount > 10) {
      setError("Ticket quantity must be between 1 and 10.");
      return false;
    }

    if (!customerMobile || !/^03\d{9}$/.test(customerMobile)) {
      setError("Please enter a valid mobile number starting with 03.");
      return false;
    }

    return true;
  };

  const handlePayNow = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/create-order`,
        {
          user_id: session.user.id,
          event_id: event.id,
          amount: ticketCount * event.price,
          customerName: session.user.user_metadata?.full_name || "Guest",
          customerEmail: session.user.email,
          customerMobile
        }
      );

      const { invoiceUrl, orderNumber } = response.data;

      if (invoiceUrl && orderNumber) {
        localStorage.setItem("last_order_number", orderNumber);
        window.location.href = invoiceUrl;
      } else {
        throw new Error("No invoice link returned. Please try again.");
      }
    } catch (err) {
      console.error("❌ Payment Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!event && !error) return <p className="text-center mt-10">Loading event...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{event?.title}</h2>
      <p className="text-gray-600 mb-2">{event?.description}</p>
      <p className="text-gray-800 mb-2">Price per Ticket: Rs. {event?.price}</p>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Tickets:</label>
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
          Mobile Number <span className="text-gray-500">(e.g. 03001234567)</span>
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
        {loading ? "Processing Payment..." : "Pay Now"}
      </button>
    </div>
  );
};

export default TicketBooking;
