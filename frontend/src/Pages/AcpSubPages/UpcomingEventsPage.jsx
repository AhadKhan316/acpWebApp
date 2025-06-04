// src/pages/UpcomingEventsPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import posterImg1 from "/src/assets/Upcoming-events-img/alumni-2025.jpeg";
import posterImg3 from "/src/assets/Upcoming-events-img/admission-suvapa-2025.jpeg";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Arts Alumni Festival",
      date: "2025-05-09",
      description: "Join us for the second chapter of our cultural event in Sukkur.",
      image: posterImg1,
      infoLink: "",
      ticketsLink: "https://ticketwala.pk/event/arts-alumni-festival-2827",
      priority: 2,
    },
    {
      id: 3,
      title: "Sovapa Admission Open",
      date: "2025-04-13",
      description: "Learn from experts in our series of art workshops.",
      image: posterImg3,
      infoLink: "",
      ticketsLink: "",
      priority: 1,
    },
  ]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  const featuredVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: {
      scale: 1.04,
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    fetch("/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((e) => new Date(e.date) >= new Date());
        const sorted = filtered.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
        setEvents(sorted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <motion.section
      className="py-16 bg-gradient-to-b from-slate-50 to-slate-200 text-black"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-4 text-gray-900">
          Upcoming Events
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover what’s happening next and secure your spot in these exciting upcoming experiences.
        </p>

        {events.length > 0 ? (
          <>
            <motion.div
              className="mb-20"
              custom={0}
              variants={featuredVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#B90602] text-white text-xs font-bold px-4 py-1 rounded-br-xl">
                  Featured Event
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={events[0].image}
                      alt={events[0].title}
                      className="w-full h-[300px] lg:h-[400px] object-cover rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-10 bg-slate-50 flex flex-col justify-center">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {events[0].title.toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-base lg:text-lg mb-4">
                      {new Date(events[0].date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base mb-6">
                      {events[0].description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {events[0].infoLink && (
                        <a
                          href={events[0].infoLink}
                          className="px-6 py-3 bg-gray-800 text-white font-semibold text-sm rounded-full hover:bg-gray-900"
                        >
                          INFO
                        </a>
                      )}
                      {events[0].ticketsLink && (
                        <a
                          href={events[0].ticketsLink}
                          className="px-6 py-3 bg-[#B90602] text-white font-semibold text-sm rounded-full hover:bg-red-800"
                        >
                          TICKETS
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {events.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {events.slice(1).map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    custom={index + 1}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[200px] sm:h-[250px] object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title.toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-gray-700 text-sm mb-4">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {event.infoLink && (
                          <a
                            href={event.infoLink}
                            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-900"
                          >
                            INFO
                          </a>
                        )}
                        {event.ticketsLink && (
                          <a
                            href={event.ticketsLink}
                            className="px-4 py-2 bg-[#B90602] text-white text-sm rounded-full hover:bg-red-800"
                          >
                            TICKETS
                          </a>
                        )}
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