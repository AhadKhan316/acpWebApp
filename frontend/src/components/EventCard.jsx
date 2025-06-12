import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";


const EventCard = ({ event }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alreadyAttending, setAlreadyAttending] = useState(false);

  const isFree = event.price === 0;

  useEffect(() => {
    const checkAttendance = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("user_events")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_id", event.id)
        .single();

      if (data) setAlreadyAttending(true);
    };

    checkAttendance();
  }, [user, event.id]);

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please log in to register.");
      return navigate("/login"); // Replace with modal if using modal auth
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("user_events")
        .insert([{ user_id: user.id, event_id: event.id }]);

      if (error) throw error;

      toast.success("You are marked as attending!");
      setAlreadyAttending(true);
    } catch (err) {
      toast.error(err.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      <img
        src={event.image_url}
        alt={event.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {event.title.toUpperCase()}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            {new Date(event.start_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-gray-700 text-sm mb-4">{event.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
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

          {/* Button Logic */}
          {isFree ? (
            user ? (
              alreadyAttending ? (
                <button
                  disabled
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-full cursor-default"
                >
                  Already Attending
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="px-4 py-2 bg-[#B90602] text-white text-sm rounded-full hover:bg-red-800 disabled:opacity-50"
                >
                  I’m Attending
                </button>
              )
            ) : (
              <button
                onClick={handleRegister}
                className="px-4 py-2 bg-[#B90602] text-white text-sm rounded-full hover:bg-red-800"
              >
                Register Now
              </button>
            )
          ) : event.tickets_link ? (
            <a
              href={event.tickets_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#B90602] text-white text-sm rounded-full hover:bg-red-800"
            >
              Get Tickets
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_url: PropTypes.string,
    start_date: PropTypes.string,
    price: PropTypes.number,
    tickets_link: PropTypes.string,
    info_link: PropTypes.string,
  }).isRequired,
};

export default EventCard;
