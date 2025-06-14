// Fully updated EventCard.jsx styled to match final shared design
import { useSession } from "@supabase/auth-helpers-react";
import { markAttendance } from "../services/attendanceService";
import { Calendar, Clock, MapPin } from "lucide-react";


const EventCard = ({ event }) => {
  const session = useSession();

  const handleAttend = async () => {
    if (!session?.user) {
      toast.error("Please log in to register.");
      window.location.href = "/login";
      return;
    }

    try {
      await markAttendance(session.user.id, event.id);
      toast.success("You are marked as attending.");
    } catch (err) {
      toast.error("You’ve already registered for this event.");
    }
  };

  const formattedDate = new Date(event.start_date);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow border overflow-hidden">
      <div className="md:w-1/2 w-full">
        <img
          src={event.image_url || "/placeholder.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between md:w-1/2 w-full p-6">
        <div className="flex justify-between items-start">
          <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Featured
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

        <h3 className="text-2xl font-bold mt-4 text-gray-900">{event.title}</h3>

        <p className="flex items-center text-gray-700 text-sm mt-2">
          <Calendar className="w-4 h-4 mr-2" />
          {formattedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p className="flex items-center text-gray-700 text-sm mt-1">
          <Clock className="w-4 h-4 mr-2" />
          {event.time || "TBA"}
        </p>

        <p className="flex items-center text-gray-700 text-sm mt-1">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location || "Venue TBA"}
        </p>

        <p className="text-sm text-gray-600 mt-3 mb-5">
          {event.description?.slice(0, 130) || "Details coming soon..."}
        </p>

        <div>
          {event.type === "free" ? (
            session?.user ? (
              <button
                onClick={handleAttend}
                className="px-5 py-2 text-sm font-semibold bg-red-700 text-white rounded hover:bg-red-800"
              >
                I'm Attending
              </button>
            ) : (
              <a
                href="/login"
                className="px-5 py-2 text-sm font-semibold bg-red-700 text-white rounded hover:bg-red-800"
              >
                Register Yourself
              </a>
            )
          ) : (
            <a
              href={event.tickets_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-semibold bg-red-700 text-white rounded hover:bg-red-800"
            >
              Get Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
