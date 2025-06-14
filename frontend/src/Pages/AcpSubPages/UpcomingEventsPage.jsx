// Final polished UpcomingEventsPage.jsx with a modern calendar UI
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

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*");

      if (!error && data) {
        setEvents(data);
      }
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

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-white border border-gray-200 h-28"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const thisDate = new Date(selectedYear, selectedMonth, i);
      const isSelected = selectedDate.toDateString() === thisDate.toDateString();
      const dayEvents = getEventsForDate(thisDate);

      days.push(
        <div
          key={i}
          className={`relative flex flex-col items-start p-2 border rounded-md bg-white h-28 overflow-hidden transition-all duration-200 ${isSelected ? "ring-2 ring-red-500" : "hover:bg-gray-50"}`}
          onClick={() => setSelectedDate(thisDate)}
        >
          <div className="text-sm font-semibold text-gray-700">{i}</div>
          <div className="mt-1 space-y-1 w-full">
            {dayEvents.slice(0, 2).map((ev, idx) => (
              <div
                key={idx}
                className="text-[10px] bg-red-100 text-red-800 font-medium px-2 py-0.5 rounded w-full truncate"
              >
                {ev.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[10px] text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 border rounded-xl overflow-hidden bg-gray-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div
            key={day}
            className="text-center font-semibold text-sm text-gray-600 py-2 bg-white border-b"
          >
            {day}
          </div>
        ))}
        {days}
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
      className="py-10 px-4 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="space-x-2">
          <button onClick={() => setActiveView("grid")} className={`px-4 py-2 rounded ${activeView === "grid" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Grid View</button>
          <button onClick={() => setActiveView("calendar")} className={`px-4 py-2 rounded ${activeView === "calendar" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Calendar View</button>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} />
            <span className="text-sm">Show Archived Events</span>
          </label>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border text-sm px-2 py-1 rounded"
          >
            <option value="all">All Categories</option>
            {availableCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-lg font-semibold">
          <button onClick={() => handleMonthChange(-1)}>&lt;</button>
          <span>{new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
          <button onClick={() => handleMonthChange(1)}>&gt;</button>
        </div>
      </div>

      {activeView === "calendar" && (
        <div className="mb-10">
          {renderCalendar()}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {(activeView === "calendar" ? getEventsForDate(selectedDate) : filteredEvents).map((event) => (
          <EventCard key={event.id} event={event} session={session} />
        ))}
      </div>
    </motion.section>
  );
};

export default UpcomingEventsPage;
