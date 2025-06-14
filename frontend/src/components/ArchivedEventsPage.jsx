import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { supabase } from "../services/supabaseClient";

const ArchivedEventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchArchivedEvents = async () => {
      const today = new Date();
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Error fetching archived events:", error.message);
        return;
      }

      const past = data.filter(event => new Date(event.end_date) < today);
      setEvents(past);
    };

    fetchArchivedEvents();
  }, []);

  const formatDateRange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    if (s.toDateString() === e.toDateString()) {
      return s.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    }
    return `${s.toLocaleDateString()} - ${e.toLocaleDateString()}`;
  };

  return (
    <motion.section
      className="py-12 md:py-16 bg-slate-100 text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Archived Events</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            These events have concluded. Feel free to explore what we’ve accomplished!
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No past events available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {formatDateRange(event.start_date, event.end_date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time || "TBA"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location || "Arts Council"}
                    </div>
                  </div>

                  {event.description && (
                    <p className="mt-3 text-sm text-gray-700 line-clamp-3">{event.description}</p>
                  )}

                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-xs text-gray-500 bg-gray-200 rounded-full">
                      Event Ended
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ArchivedEventsPage;
