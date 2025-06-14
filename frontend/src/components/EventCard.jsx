// EventCard.jsx - modern layout
import PropTypes from "prop-types";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { motion } from "framer-motion";

const EventCard = ({ event, archived = false }) => {
  const formatDateRange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    if (s.toDateString() === e.toDateString()) {
      return s.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }
    return `${s.toLocaleDateString()} - ${e.toLocaleDateString()}`;
  };

  return (
    <motion.div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col" whileHover={{ scale: 1.02 }}>
      <img src={event.image_url} alt={event.title} className="h-48 w-full object-cover" />
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-1">{event.title}</h3>
          <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
            <Calendar className="w-4 h-4" /> {formatDateRange(event.start_date, event.end_date)}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
            <Clock className="w-4 h-4" /> {event.time || "TBA"}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {event.location || "Arts Council"}
          </div>
        </div>
        {event.description && <p className="mt-3 text-sm text-gray-700 line-clamp-3">{event.description}</p>}
        <div className="mt-4 flex gap-2 flex-wrap">
          {archived ? (
            <span className="inline-block px-3 py-1 text-xs text-gray-500 bg-gray-200 rounded-full">Event Ended</span>
          ) : (
            event.tickets_link && (
              <a
                href={event.tickets_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-white bg-[#B90602] px-4 py-2 rounded hover:bg-red-800"
              >
                <Ticket className="w-4 h-4 mr-2" />
                {event.price === 0 ? "Register Now" : "Get Tickets"}
              </a>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    tickets_link: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  archived: PropTypes.bool
};

export default EventCard;
