// components/BuyTicketsModal.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BuyTicketsModal = ({ event, user, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!customer.name || !customer.email || !customer.mobile) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/buy-ticket", {
        user_id: user.id,
        event_id: event.id,
        quantity,
        customer,
      });

      const { payUrl } = res.data;
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        toast.error("Could not retrieve payment link.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Buy Tickets – {event.title}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            name="mobile"
            value={customer.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          {loading ? "Redirecting..." : `Pay PKR ${quantity * parseFloat(event.price)} Now`}
        </button>
      </div>
    </div>
  );
};

export default BuyTicketsModal;
