import { useState } from "react";
import { createTicketOrder } from "../services/ticketService";
import toast from "react-hot-toast";

const TicketPurchaseModal = ({ event, onClose }) => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const response = await createTicketOrder(event.id, event.price, details);
      window.location.href = response.payment_url;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Buy Ticket for {event.title}</h2>

      <input
        type="text"
        placeholder="Your Full Name"
        className="mb-2 p-2 w-full border"
        onChange={e => setDetails({ ...details, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 w-full border"
        onChange={e => setDetails({ ...details, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Mobile"
        className="mb-2 p-2 w-full border"
        onChange={e => setDetails({ ...details, mobile: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        className="mb-4 p-2 w-full border"
        onChange={e => setDetails({ ...details, address: e.target.value })}
      />

      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <button onClick={onClose} className="mt-3 text-gray-500 text-sm">Cancel</button>
    </div>
  );
};

export default TicketPurchaseModal;
