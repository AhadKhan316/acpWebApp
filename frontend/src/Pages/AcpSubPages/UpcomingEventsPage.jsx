import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../services/supabaseClient";
import EventCard from "../../components/EventCard";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [activeView, setActiveView] = useState("grid");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
        return;
      }

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const upcoming = data.filter(event => {
        const end = new Date(event.end_date);
        end.setHours(23, 59, 59, 999);
        return end >= now;
      });

      setEvents(upcoming);
    };

    fetchEvents();
  }, []);

  const changeMonth = (dir) => {
    if (dir === "prev") {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else setSelectedMonth(selectedMonth - 1);
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else setSelectedMonth(selectedMonth + 1);
    }
  };

  const getEventsForMonth = () => {
    return events.filter(event => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      return (
        (start.getMonth() <= selectedMonth && start.getFullYear() <= selectedYear) &&
        (end.getMonth() >= selectedMonth && end.getFullYear() >= selectedYear)
      );
    });
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      const current = new Date(date);
      return current >= start && current <= end;
    });
  };

  const handleDateClick = (day) => {
    const clicked = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(clicked);
    setActiveView("grid");
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`start-${i}`} className="min-h-24 bg-gray-50" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const dayEvents = getEventsForDate(date);

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          className={`p-2 min-h-24 cursor-pointer transition-all
            ${isToday ? "border-2 border-[#B90602]" : ""}
            ${isSelected ? "bg-red-50" : "bg-white"}
            hover:bg-gray-100`}
        >
          <div className={`text-right font-medium ${isToday ? "text-[#B90602]" : ""}`}>
            {day}
          </div>
          {dayEvents.slice(0, 2).map((e) => (
            <div key={e.id} className="text-xs mt-1 bg-red-50 text-[#B90602] p-1 rounded truncate">
              {e.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
          )}
        </div>
      );
    }

    const totalCells = firstDayOfMonth + daysInMonth;
    const extraCells = 7 - (totalCells % 7);
    if (extraCells < 7) {
      for (let i = 0; i < extraCells; i++) {
        days.push(<div key={`end-${i}`} className="min-h-24 bg-gray-50" />);
      }
    }

    return days;
  };

  const dayEvents = getEventsForDate(selectedDate);
  const monthEvents = getEventsForMonth();

  return (
    <motion.section
      className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore what's coming next and join us in our cultural celebrations
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="space-x-2">
            <button
              onClick={() => setActiveView("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${activeView === "grid" ? "bg-[#B90602] text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setActiveView("calendar")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${activeView === "calendar" ? "bg-[#B90602] text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => changeMonth("prev")} className="p-2 rounded hover:bg-gray-200">
              &lt;
            </button>
            <span className="text-lg font-semibold">
              {months[selectedMonth]} {selectedYear}
            </span>
            <button onClick={() => changeMonth("next")} className="p-2 rounded hover:bg-gray-200">
              &gt;
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {activeView === "calendar" && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-12">
            <div className="grid grid-cols-7 bg-gray-100 border-b">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="py-3 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">{renderCalendarDays()}</div>
          </div>
        )}

        {/* Grid View */}
        {activeView === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeView === "calendar" ? dayEvents : monthEvents).map(event => {
              const today = new Date();
              const startDate = new Date(event.start_date);
              const endDate = new Date(event.end_date);
              const isToday = today.toDateString() === startDate.toDateString();
              const label = isToday ? "Happening Now" : "Upcoming";
              return <EventCard key={event.id} event={{ ...event, label }} />;
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default UpcomingEventsPage;
