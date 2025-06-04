import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);

  // Framer Motion variants for section animation
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Framer Motion variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  // Framer Motion variants for featured event
  const featuredVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => {
        // Ensure image URLs are absolute
        const updatedEvents = data.map(event => ({
          ...event,
          image: event.image ? `http://localhost:5000${event.image}` : null
        }));
        setEvents(updatedEvents);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <motion.section
      className="py-12 bg-gradient-to-b from-gray-50 to-gray-200 text-black"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
          Upcoming Events
        </h2>

        {events.length > 0 ? (
          <>
            {/* Featured Event (First Event) */}
            <motion.div
              className="mb-16"
              custom={0}
              variants={featuredVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#B90602] text-white text-sm font-bold px-4 py-1 rounded-br-lg">
                  Featured Event
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    {events[0].image ? (
                      <img
                        src={events[0].image}
                        alt={events[0].title}
                        className="w-full h-[300px] lg:h-[400px] object-cover rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl"
                      />
                    ) : (
                      <div className="w-full h-[300px] lg:h-[400px] bg-gray-200 flex items-center justify-center rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                      {events[0].title.toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg mb-4">
                      {new Date(events[0].date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base mb-6">
                      {events[0].description}
                    </p>
                    <div className="flex space-x-4">
                      {events[0].infoLink ? (
                        <a
                          href={events[0].infoLink}
                          className="px-6 py-3 bg-gray-800 text-white font-semibold text-sm rounded-full hover:bg-gray-900 transition duration-300"
                          aria-label={`More info about ${events[0].title}`}
                        >
                          INFO
                        </a>
                      ) : null}
                      {events[0].ticketsLink ? (
                        <a
                          href={events[0].ticketsLink}
                          className="px-6 py-3 bg-[#B90602] text-white font-semibold text-sm rounded-full hover:bg-red-800 transition duration-300"
                          aria-label={`Get tickets for ${events[0].title}`}
                        >
                          TICKETS
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Other Events Grid */}
            {events.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(1).map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                    custom={index + 1}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-[200px] sm:h-[250px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[200px] sm:h-[250px] bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {event.title.toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-3">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-gray-700 text-sm mb-4">
                        {event.description}
                      </p>
                      <div className="flex space-x-3">
                        {event.infoLink ? (
                          <a
                            href={event.infoLink}
                            className="px-4 py-2 bg-gray-800 text-white font-semibold text-sm rounded-full hover:bg-gray-900 transition duration-300"
                            aria-label={`More info about ${event.title}`}
                          >
                            INFO
                          </a>
                        ) : null}
                        {event.ticketsLink ? (
                          <a
                            href={event.ticketsLink}
                            className="px-4 py-2 bg-[#B90602] text-white font-semibold text-sm rounded-full hover:bg-red-800 transition duration-300"
                            aria-label={`Get tickets for ${event.title}`}
                          >
                            TICKETS
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-lg text-gray-700">
            No upcoming events at this time.
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default UpcomingEventsPage;