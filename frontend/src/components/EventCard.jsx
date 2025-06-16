import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { markAttendance, getUserAttendance } from "../services/attendanceService";
import { Calendar, Clock, MapPin } from "lucide-react";
import BuyTicketsModal from "./BuyTicketsModal";

const EventCard = ({ event, session }) => {
  const [status, setStatus] = useState(null); // 'interested' | 'going' | null
  const [showModal, setShowModal] = useState(false);
  const userId = session?.user?.id;

  const formattedDate = new Date(event.start_date);

  useEffect(() => {
    if (userId && event.id && event.type === "free") {
      getUserAttendance(userId, event.id).then(setStatus);
    }
  }, [userId, event.id, event.type]);

  const handleStatus = async (type) => {
    if (!userId) {
      alert("Please log in to continue.");
      window.location.href = "/login";
      return;
    }

    try {
      await markAttendance(userId, event.id, type);
      setStatus(type);
      alert(`Marked as "${type}"`);
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="md:w-1/2 w-full h-48 md:h-auto">
        <img
          src={event.image_url || "/placeholder-event.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between md:w-1/2 w-full p-5">
        <div className="flex justify-between items-start">
          <span className="bg-red-600/90 text-white text-xs px-3 py-1 rounded-full font-medium">
            {event.category || "Featured"}
          </span>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium">
              {formattedDate.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <p className="text-2xl text-red-700 font-bold leading-none">
              {formattedDate.getDate()}
            </p>
            <p className="text-sm text-gray-500">
              {formattedDate.toLocaleDateString("en-US", { month: "short" })}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-3 text-gray-900">{event.title}</h3>

        <div className="space-y-1.5 mt-3">
          <p className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            {formattedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <p className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            {event.time || "Time to be announced"}
          </p>

          <p className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            {event.location || "Venue to be announced"}
          </p>
        </div>

        <p className="text-sm text-gray-600 mt-3 mb-4 line-clamp-2">
          {event.description || "Details coming soon..."}
        </p>

        <div>
          {event.type === "free" ? (
            userId ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatus("interested")}
                  className={`w-1/2 px-4 py-2 text-sm rounded-md ${
                    status === "interested"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  Interested
                </button>
                <button
                  onClick={() => handleStatus("going")}
                  className={`w-1/2 px-4 py-2 text-sm rounded-md ${
                    status === "going"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Going
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="w-full px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md inline-block text-center"
              >
                Register Yourself
              </a>
            )
          ) : (
            userId ? (
              <>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Buy Tickets
                </button>
                {showModal && (
                  <BuyTicketsModal
                    event={event}
                    user={session.user}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </>
            ) : (
              <button
              onClick={() => document.getElementById("open-auth-modal")?.click()}
              className="w-full px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md inline-block text-center"
            >
              Register Yourself
            </button>
            
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
