// src/Pages/TicketBooking.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import axios from 'axios';
import toast from 'react-hot-toast';

const TicketBookingPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
      if (error) {
        toast.error('Error fetching event');
      } else {
        setEvent(data);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handlePayNow = async () => {
    if (!event) return;
    if (ticketCount < 1 || ticketCount > 10) {
      toast.error('Select between 1 and 10 tickets');
      return;
    }

    setIsProcessing(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        toast.error('You must be logged in');
        setIsProcessing(false);
        return;
      }

      const res = await axios.post('/api/create-order', {
        user_id: user.id,
        event_id: event.id,
        amount: event.price * ticketCount,
        customerName: user.user_metadata?.full_name || 'Guest',
        customerEmail: user.email,
        customerMobile: '',
      });

      const { invoiceUrl } = res.data;
      window.location.href = invoiceUrl;
    } catch (err) {
      toast.error('Could not retrieve payment link');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading event details...</div>;
  if (!event) return <div className="p-10 text-center text-red-600">Event not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Tickets: {event.title}</h1>

      <img
        src={event.image_url || '/placeholder-event.jpg'}
        alt={event.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <p className="text-gray-700 mb-2">Price: Rs. {event.price}</p>
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Ticket Quantity</label>
      <select
        className="border rounded px-3 py-2 mb-4 w-full"
        value={ticketCount}
        onChange={(e) => setTicketCount(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <button
        onClick={handlePayNow}
        disabled={isProcessing}
        className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay Rs. ${event.price * ticketCount}`}
      </button>
    </div>
  );
};

export default TicketBookingPage;
