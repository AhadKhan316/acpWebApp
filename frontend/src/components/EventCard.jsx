// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={event.image_url}
        alt={event.title}
        className="w-full h-[200px] sm:h-[250px] object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {event.title.toUpperCase()}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {new Date(event.start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-700 text-sm mb-4">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {event.info_link && (
            <a
              href={event.info_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-900"
            >
              INFO
            </a>
          )}
          {event.tickets_link && (
            <a
              href={event.tickets_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#B90602] text-white text-sm rounded-full hover:bg-red-800"
            >
              TICKETS
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
