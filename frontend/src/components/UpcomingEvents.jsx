import { useUser } from "@supabase/auth-helpers-react";

const EventCard = ({ event }) => {
  const user = useUser();

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {new Date(event.start_date).toLocaleDateString()}
        </p>
        <p className="text-sm mb-4">{event.description}</p>

        {user ? (
          event.price > 0 ? (
            <a
              href={`/event/${event.id}/buy`}
              className="bg-red-600 text-white px-4 py-2 rounded-full"
            >
              Buy Ticket
            </a>
          ) : (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-full"
              onClick={() => markInterest(event.id)}
            >
              Mark Interested
            </button>
          )
        ) : (
          <p className="text-gray-500 text-sm">Login to register for this event</p>
        )}
      </div>
    </div>
  );
};
