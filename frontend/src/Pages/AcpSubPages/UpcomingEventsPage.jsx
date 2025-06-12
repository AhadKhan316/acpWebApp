// src/pages/UpcomingEventsPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventCard from "../../components/EventCard";
import { fetchUpcomingEvents } from "../../services/eventService";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUpcomingEvents()
      .then((data) => {
        const sorted = data.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
        setEvents(sorted);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <motion.section
      className="py-16 bg-gradient-to-b from-slate-50 to-slate-200 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-4 text-gray-900">
          Upcoming Events
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover what’s happening next and secure your spot in these exciting upcoming experiences.
        </p>

        {error && <p className="text-center text-red-600">{error}</p>}

        {events.length > 0 ? (
          <>
            {/* Featured Event */}
            <motion.div
              className="mb-20"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#B90602] text-white text-xs font-bold px-4 py-1 rounded-br-xl">
                  Featured Event
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={events[0].image_url}
                      alt={events[0].title}
                      className="w-full h-[300px] lg:h-[400px] object-cover rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-10 bg-slate-50 flex flex-col justify-center">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {events[0].title.toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-base lg:text-lg mb-4">
                      {new Date(events[0].start_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base mb-6">
                      {events[0].description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {events[0].info_link && (
                        <a
                          href={events[0].info_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-gray-800 text-white font-semibold text-sm rounded-full hover:bg-gray-900"
                        >
                          INFO
                        </a>
                      )}
                      {events[0].tickets_link && (
                        <a
                          href={events[0].tickets_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-[#B90602] text-white font-semibold text-sm rounded-full hover:bg-red-800"
                        >
                          Register Now
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Other Events */}
            {events.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {events.slice(1).map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-lg text-gray-700">No upcoming events at this time.</p>
        )}
      </div>
    </motion.section>
  );
};

export default UpcomingEventsPage;
