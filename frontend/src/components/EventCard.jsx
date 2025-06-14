import { useSession } from "@supabase/auth-helpers-react";
import { markAttendance } from "../services/attendanceService";
import { Calendar, Clock, MapPin } from "lucide-react";
// import { toast } from "react-hot-toast";

const EventCard = ({ event, session }) => {
  const handleAttend = async () => {
    if (!session?.user) {
      toast.error("Please log in to register.");
      window.location.href = "/login";
      return;
    }

    try {
      await markAttendance(session.user.id, event.id);
      toast.success("You are marked as attending!");
    } catch (err) {
      toast.error("You've already registered for this event.");
    }
  };

  const formattedDate = new Date(event.start_date);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image Section - Same Structure */}
      <div className="md:w-1/2 w-full h-48 md:h-auto">
        <img
          src={event.image_url || "/placeholder-event.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section - Same Structure */}
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
            session?.user ? (
              <button
                onClick={handleAttend}
                className="w-full px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                I'm Attending
              </button>
            ) : (
              <a
                href="/login"
                className="w-full px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors inline-block text-center"
              >
                Register Yourself
              </a>
            )
          ) : (
            <a
              href={event.tickets_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors inline-block text-center"
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