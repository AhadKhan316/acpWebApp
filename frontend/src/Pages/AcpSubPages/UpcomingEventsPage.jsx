import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../../services/supabaseClient";
import EventCard from "../../components/EventCard";

const UpcomingEventsPage = () => {
  const session = useSession();
  const [events, setEvents] = useState([]);
  const [activeView, setActiveView] = useState("grid");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showArchived, setShowArchived] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      if (!error && data) {
        setEvents(data);
      }
      setIsLoading(false);
    }
    loadEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const end = new Date(event.end_date);
    if (!showArchived && end < now) return false;
    if (categoryFilter !== "all" && event.category !== categoryFilter) return false;
    return true;
  });

  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      const d = new Date(date);
      d.setHours(12);
      return d >= start && d <= end;
    });
  };

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const startDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const renderCalendar = () => {
    const weeks = [];
    let days = [];

    // Empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className="h-32 border border-gray-100 bg-gray-50"
        />
      );
    }

    // Calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const thisDate = new Date(selectedYear, selectedMonth, i);
      const isSelected = selectedDate.toDateString() === thisDate.toDateString();
      const isToday = new Date().toDateString() === thisDate.toDateString();
      const dayEvents = getEventsForDate(thisDate);

      days.push(
        <div
          key={i}
          className={`relative flex flex-col p-2 h-32 overflow-hidden transition-colors duration-150 ${
            isSelected 
              ? "bg-blue-50 border border-blue-200" 
              : "border border-gray-100 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedDate(thisDate)}
        >
          <div className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
            isToday 
              ? "bg-red-600 text-white" 
              : isSelected 
                ? "text-red-600" 
                : "text-gray-700"
          }`}>
            {i}
          </div>
          <div className="mt-1 space-y-1 w-full overflow-y-auto">
            {dayEvents.slice(0, 3).map((ev, idx) => (
              <div
                key={idx}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded w-full truncate"
              >
                {ev.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 text-center">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-100">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div
              key={day}
              className="text-center font-medium text-xs text-gray-500 py-3 bg-white uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const handleMonthChange = (direction) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const availableCategories = [...new Set(events.map(e => e.category))].filter(Boolean);

  return (
    <motion.section
      className="py-8 px-4 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Upcoming Events</h1>
        <p className="text-gray-600">View and manage your scheduled events</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex rounded-md shadow-sm" role="group">
            <button 
              onClick={() => setActiveView("grid")} 
              className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
                activeView === "grid" 
                  ? "bg-red-600 text-white border-red-600" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setActiveView("calendar")} 
              className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
                activeView === "calendar" 
                  ? "bg-red-600 text-white border-red-600" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={showArchived} 
                onChange={(e) => setShowArchived(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              <span className="ml-2 text-sm font-medium text-gray-700">Show Archived</span>
            </label>
          </div>

          <div className="w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            >
              <option value="all">All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", { 
            month: "long", 
            year: "numeric" 
          })}
        </h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleMonthChange(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={() => {
              setSelectedMonth(new Date().getMonth());
              setSelectedYear(new Date().getFullYear());
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          >
            Today
          </button>
          <button 
            onClick={() => handleMonthChange(1)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {activeView === "calendar" && (
        <div className="mb-10">
          {renderCalendar()}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {activeView === "calendar" 
              ? `Events on ${selectedDate.toLocaleDateString("en-US", { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}`
              : 'All Upcoming Events'}
          </h3>
          
          <div className="space-y-4">
            {(activeView === "calendar" ? getEventsForDate(selectedDate) : filteredEvents).length > 0 ? (
              (activeView === "calendar" ? getEventsForDate(selectedDate) : filteredEvents).map((event) => (
                <EventCard key={event.id} event={event} session={session} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="mt-4 text-lg font-medium text-gray-700">No events found</h4>
                <p className="mt-1 text-gray-500">
                  {activeView === "calendar" 
                    ? "No events scheduled for this date" 
                    : "No upcoming events match your filters"}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </motion.section>
  );
};

export default UpcomingEventsPage;