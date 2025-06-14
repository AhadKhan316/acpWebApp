// src/components/EventCard.jsx
import { useState } from "react";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { markAttendance } from "../services/attendanceService";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

const EventCard = ({ event }) => {
  const { supabaseClient } = useSessionContext();
  const user = useUser();
  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAttend = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await markAttendance(supabaseClient, user.id, event.id);
      setAttending(true);
    } catch (err) {
      console.error("Failed to mark attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={event.image_url}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(event.start_date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {event.location && (
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        )}

        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{event.description}</p>

        <div className="flex flex-wrap gap-2">
          {event.ticketsLink && event.eventType === "paid" && (
            <a
              href={event.ticketsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#B90602] text-white text-sm rounded-lg hover:bg-red-800"
            >
              <Ticket className="h-4 w-4 mr-1 inline" /> Get Tickets
            </a>
          )}

          {event.eventType === "free" && user && !attending && (
            <button
              onClick={handleAttend}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
            >
              {loading ? "Joining..." : "I'm Attending"}
            </button>
          )}

          {event.eventType === "free" && user && attending && (
            <div className="px-4 py-2 bg-gray-300 text-sm rounded-lg">
              You’re attending
            </div>
          )}

          {event.eventType === "free" && !user && (
            <a
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Register Yourself
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
