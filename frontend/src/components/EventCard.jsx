// src/components/EventCard.jsx
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { markAttendance } from "../services/attendanceService";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { toast } from "react-hot-toast";

const EventCard = ({ event }) => {
  const { session } = useSession();
  const navigate = useNavigate();

  const handleAttend = async () => {
    if (!session) return navigate("/login");
    try {
      await markAttendance(session.user.id, event.id);
      toast.success("You are marked as attending.");
    } catch (err) {
      toast.error("Already marked as attending.");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-sm text-gray-600 mt-1 flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(event.start_date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600 mt-1 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {event.location || "TBA"}
        </p>
        <p className="mt-3 text-sm text-gray-700 line-clamp-2">{event.description}</p>

        <div className="mt-4 flex justify-between items-center">
          {event.type === "free" ? (
            session ? (
              <button onClick={handleAttend} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                I'm Attending
              </button>
            ) : (
              <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Register Yourself
              </button>
            )
          ) : (
            <a
              href={event.tickets_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#B90602] text-white rounded hover:bg-red-800 flex items-center"
            >
              <Ticket className="w-4 h-4 mr-1" />
              Get Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
