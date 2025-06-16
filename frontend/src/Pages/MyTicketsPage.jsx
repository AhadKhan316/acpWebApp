// src/Pages/UserPortal/MyTicketsPage.jsx
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../services/supabaseClient";
import { Calendar, Clock, MapPin } from "lucide-react";

const MyTicketsPage = () => {
  const session = useSession();
  const [tab, setTab] = useState("free");
  const [freeEvents, setFreeEvents] = useState([]);
  const [ticketOrders, setTicketOrders] = useState([]);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    fetchFreeEvents();
    fetchTicketOrders();
  }, [userId]);

  const fetchFreeEvents = async () => {
    const { data, error } = await supabase
      .from("event_attendance")
      .select("status, events(*)")
      .eq("user_id", userId);

    if (!error && data) {
      const mapped = data.map(row => ({ ...row.events, status: row.status }));
      setFreeEvents(mapped);
    }
  };

  const fetchTicketOrders = async () => {
    const { data, error } = await supabase
      .from("ticket_orders")
      .select("*, events(*)")
      .eq("user_id", userId);

    if (!error && data) {
      const mapped = data.map(row => ({ ...row.events, ...row }));
      setTicketOrders(mapped);
    }
  };

  const renderEventCard = (event, isFree = false) => {
    const formattedDate = new Date(event.start_date);
    return (
      <div key={event.id} className="bg-white rounded-lg shadow border p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-500">{event.location}</p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formattedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" /> {event.time || "TBA"}
            </p>
          </div>
          <div className="text-sm text-right">
            {isFree ? (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                {event.status === "going" ? "Attending" : "Interested"}
              </span>
            ) : (
              <span className={`px-2 py-1 text-xs rounded ${event.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {event.payment_status === "paid" ? "Paid" : "Pending"}
              </span>
            )}
          </div>
        </div>
        {!isFree && (
          <p className="text-sm text-gray-700">Qty: {event.quantity} | Amount: PKR {event.amount_paid}</p>
        )}
      </div>
    );
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("free")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            tab === "free"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          My Free Events
        </button>
        <button
          onClick={() => setTab("paid")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            tab === "paid"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          My Ticket Orders
        </button>
      </div>

      <div className="space-y-4">
        {tab === "free"
          ? freeEvents.length > 0
            ? freeEvents.map(e => renderEventCard(e, true))
            : <p className="text-gray-500">You have not RSVP’d to any free events.</p>
          : ticketOrders.length > 0
            ? ticketOrders.map(e => renderEventCard(e))
            : <p className="text-gray-500">No ticket orders found.</p>
        }
      </div>
    </section>
  );
};

export default MyTicketsPage;
