import { useEffect, useState } from 'react';

const EventsPortal = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('/api/events/upcoming')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => {});
  }, []);

  const markInterest = async (id) => {
    await fetch(`/api/events/${id}/interest`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const buyTicket = async (id) => {
    await fetch(`/api/events/${id}/buy`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => markInterest(event.id)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Interested
              </button>
              <button
                onClick={() => buyTicket(event.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Buy Ticket
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPortal;
