// src/pages/UpcomingEventsPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import { markAttendance } from "../../services/attendanceService";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";


const UpcomingEventsPage = () => {
  const session = useSession();

  const [events, setEvents] = useState([]);
  const [activeView, setActiveView] = useState("grid");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetch("/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((e) => new Date(e.end_date) >= new Date());
        const sorted = filtered.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
        setEvents(sorted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleAttend = async (eventId) => {
    if (!session?.user) {
      toast.error("Please log in to register.");
      window.location.href = "/login";
      return;
    }

    try {
      await markAttendance(session.user.id, eventId);
      toast.success("You are marked as attending.");
    } catch (err) {
      toast.error("You’ve already registered for this event.");
    }
  };

  const renderActionButton = (event) => {
    if (event.type === "free") {
      return session?.user ? (
        <button
          onClick={() => handleAttend(event.id)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          I'm Attending
        </button>
      ) : (
        <a
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register Yourself
        </a>
      );
    } else {
      return (
        <a
          href={event.tickets_link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#B90602] text-white rounded hover:bg-red-800"
        >
          Get Tickets
        </a>
      );
    }
  };

  return (
    <motion.section
      className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <Calendar className="inline mr-1 w-4 h-4" />
                  {new Date(event.start_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <MapPin className="inline mr-1 w-4 h-4" />
                  {event.location || "Venue TBA"}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {event.description?.slice(0, 100) || "Details coming soon..."}
                </p>
                <div className="flex justify-between items-center">
                  {renderActionButton(event)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default UpcomingEventsPage;
