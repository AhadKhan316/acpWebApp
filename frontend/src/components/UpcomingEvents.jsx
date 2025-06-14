// src/pages/UpcomingEventsPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

import posterImg1 from "/src/assets/Upcoming-events-img/Fete de la musique 1920x811 Web Banner.png";
import posterImg2 from "/src/assets/Upcoming-events-img/Web Banner.png";
import posterImg3 from "/src/assets/Upcoming-events-img/sadaa e watan.png";
import posterImg4 from "/src/assets/Upcoming-events-img/sadaa-e-ishq-with-zeeshan-ali.png";
import posterImg5 from "/src/assets/Upcoming-events-img/summer-rush.png";
import posterImg6 from "/src/assets/Upcoming-events-img/stf Larkana.jpg";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([
    {
      id: 5,
      title: "Sadaa-e-Ishq with Zeeshan Ali",
      startDate: "2025-06-14",
      endDate: "2025-06-14",
      time: "7:00 PM",
      location: "Arts Council, Karachi",
      description: "Eventus proudly unveils Sadaa-e-Ishq - a night of love & enchanting melodies.",
      image: posterImg4,
      infoLink: "",
      ticketsLink: "https://ticketwala.pk/event/sadaa-e-ishq-with-zeeshan-ali-2863",
      priority: 1,
      eventType: "paid"
    },
    {
      id: 1,
      title: "World Music Day",
      startDate: "2025-06-20",
      endDate: "2025-06-20",
      time: "7:00 PM",
      location: "Arts Council, Karachi",
      description: "Join us for the World Music Day celebration featuring performances from renowned artists across Pakistan.",
      image: posterImg1,
      infoLink: "",
      ticketsLink: "https://admin.acpkhi.com/world_music_day",
      priority: 2,
      eventType: "free"
    },
    {
      id: 2,
      title: "Summer Rush",
      startDate: "2025-06-21",
      endDate: "2025-06-21",
      time: "7:00 PM",
      location: "Arts Counci, Karachi",
      description: "",
      image: posterImg5,
      infoLink: "",
      ticketsLink: "https://ticketwala.pk/event/summer-rush-2982",
      priority: 3,
      eventType: "paid"
    },
    {
      id: 3,
      title: "Qawwali by Fareed Ayaz & Abu Muhammad",
      startDate: "2025-06-22",
      endDate: "2025-06-22",
      time: "8:00 PM",
      location: "Jaun Elia Lawn, Arts Council, Karachi",
      description: "Step into a soulful evening filled with the magic of Qawwali, featuring the legendary Fareed Ayaz & Abu Muhammad presented by Arts Council of Pakistan, Karachi.",
      image: posterImg2,
      infoLink: "",
      ticketsLink: "https://ticketwala.pk/",
      priority: 4,
      eventType: "paid"
    },
    {
      id: 4,
      title: "Sadaa e Watan",
      startDate: "2025-06-16",
      endDate: "2025-08-09",
      time: "8:00 PM",
      location: "Arts Council, Karachi",
      description: "Showcase your talent and celebrate our national spirit through music and performance",
      image: posterImg3,
      infoLink: "",
      ticketsLink: "https://admin.acpkhi.com/sada%20e%20watan",
      priority: 5,
      eventType: "free"
    },
    {
      id: 6,
      title: "Sindh Theatre Festival 2025 Larkana",
      startDate: "2025-06-13",
      endDate: "2025-06-22",
      time: "8:00 PM",
      location: "Arts Council, Larkano",
      description: "Showcase your talent and celebrate our national spirit through music and performance",
      image: posterImg6,
      infoLink: "",
      ticketsLink: "",
      priority: 6,
      eventType: "free"
    },
  ]);

  const [activeView, setActiveView] = useState("grid");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    fetch("/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((e) => new Date(e.endDate) >= new Date());
        const sorted = filtered.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
        setEvents(sorted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const getEventsForMonth = () => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return (
        (eventStart.getMonth() <= selectedMonth && eventStart.getFullYear() <= selectedYear) &&
        (eventEnd.getMonth() >= selectedMonth && eventEnd.getFullYear() >= selectedYear)
      );
    });
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDate = new Date(date);
      
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      
      return currentDate >= eventStart && currentDate <= eventEnd;
    });
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(clickedDate);
    setActiveView("grid");
  };

  const monthEvents = getEventsForMonth();
  const dayEvents = getEventsForDate(selectedDate);

  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-start-${i}`} className="min-h-24 bg-gray-50"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(selectedYear, selectedMonth, day);
      const dateEvents = getEventsForDate(currentDate);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected = currentDate.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div 
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          className={`min-h-24 p-2 bg-white cursor-pointer transition-all
            ${isToday ? 'border-2 border-[#B90602]' : ''}
            ${isSelected ? 'bg-red-50' : ''}
            hover:bg-gray-50`}
        >
          <div className={`text-right font-medium 
            ${isToday ? 'text-[#B90602]' : ''}
            ${isSelected ? 'font-bold' : ''}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dateEvents.slice(0, 2).map(event => (
              <div 
                key={`event-${event.id}-${day}`}
                className="text-xs p-1 bg-red-50 text-[#B90602] rounded truncate"
              >
                {event.title}
              </div>
            ))}
            {dateEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dateEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    const totalCells = firstDayOfMonth + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        days.push(<div key={`empty-end-${i}`} className="min-h-24 bg-gray-50"></div>);
      }
    }
    
    return days;
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric'
      })} - ${end.toLocaleDateString("en-US", {
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
    
    if (start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric'
      })} - ${end.toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
    
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <motion.section
      className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Discover our curated selection of cultural events, performances, and exhibitions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeView === "grid" ? 'bg-[#B90602] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setActiveView("calendar")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeView === "calendar" ? 'bg-[#B90602] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Calendar View
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => changeMonth("prev")}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold">
              {months[selectedMonth]} {selectedYear}
            </h3>
            <button 
              onClick={() => changeMonth("next")}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {activeView === "calendar" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="grid grid-cols-7 bg-gray-100 border-b">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="py-3 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {renderCalendarDays()}
            </div>
          </div>
        )}

        {events.length > 0 ? (
          <>
            {activeView === "grid" && (
              <div className="space-y-8">
                {(activeView === "calendar" ? dayEvents : monthEvents).length > 0 ? (
                  (activeView === "calendar" ? dayEvents : monthEvents).map((event, index) => (
                    <motion.div
                      key={`${event.id}-${index}`}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <div className="md:flex">
                        <div className="md:w-2/3">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="inline-block px-3 py-1 bg-[#B90602] text-white text-xs font-semibold rounded-full mb-2">
                                {event.priority <= 2 ? "Featured" : "Event"}
                              </span>
                              <h3 className="text-xl md:text-2xl font-bold mb-2">
                                {event.title}
                              </h3>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {new Date(event.startDate).toLocaleDateString("en-US", {
                                  weekday: 'short'
                                })}
                              </p>
                              <p className="text-2xl font-bold text-[#B90602]">
                                {new Date(event.startDate).getDate()}
                                {event.startDate !== event.endDate && (
                                  <span className="text-gray-700">
                                    -{new Date(event.endDate).getDate()}
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                {months[new Date(event.startDate).getMonth()].substring(0, 3)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 space-y-3">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {formatDateRange(event.startDate, event.endDate)}
                              </span>
                            </div>
                            {event.time && (
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">{event.time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                            )}
                          </div>

                          {event.description && (
                            <p className="mt-4 text-gray-700 text-sm md:text-base">
                              {event.description}
                            </p>
                          )}

                          <div className="mt-6 flex flex-wrap gap-3">
                            {event.infoLink && (
                              <a
                                href={event.infoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition"
                              >
                                More Info
                              </a>
                            )}
                            {event.ticketsLink && (
                              <a
                                href={event.ticketsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 bg-[#B90602] text-white text-sm font-medium rounded-lg hover:bg-red-800 transition"
                              >
                                <Ticket className="h-4 w-4 mr-2" />
                                {event.eventType === "free" ? "Register Yourself" : "Get Tickets"}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {activeView === "calendar" 
                        ? `No events scheduled for ${selectedDate.toLocaleDateString()}`
                        : `No events scheduled for ${months[selectedMonth]} ${selectedYear}`}
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedMonth(new Date().getMonth());
                        setSelectedYear(new Date().getFullYear());
                        setSelectedDate(new Date());
                      }}
                      className="mt-4 px-4 py-2 bg-[#B90602] text-white rounded-lg text-sm font-medium"
                    >
                      View Current Events
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming events at this time. Please check back later.</p>
          </div>
        )}

        {activeView === "calendar" && monthEvents.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">
              Events on {selectedDate.toLocaleDateString("en-US", {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayEvents.map((event, index) => (
                <motion.div
                  key={`day-${event.id}-${index}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  custom={index}
                  variants={cardVariants}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(event.startDate).toLocaleDateString("en-US", {
                            weekday: 'short'
                          })}
                        </p>
                        <p className="font-bold text-[#B90602]">
                          {new Date(event.startDate).getDate()}
                          {event.startDate !== event.endDate && (
                            <span className="text-gray-700">
                              -{new Date(event.endDate).getDate()}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    {event.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <a
                        href={event.ticketsLink || event.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B90602] text-sm font-medium hover:underline"
                      >
                        {event.ticketsLink 
                          ? (event.eventType === "free" ? "Register Now" : "Get Tickets") 
                          : "More Info"}
                      </a>
                      <span className="text-xs text-gray-500">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default UpcomingEventsPage;