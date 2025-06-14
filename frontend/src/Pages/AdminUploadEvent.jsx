// src/pages/AdminUploadEvent.jsx
import { useState } from "react";
import { supabase } from "../services/supabaseClient";

const AdminUploadEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    start_date: "",
    end_date: "",
    time: "",
    location: "",
    info_link: "",
    tickets_link: "",
    event_type: "free",
    price: 0,
    priority: 99,
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    const payload = {
      ...form,
      price: form.event_type === "ticketed" ? parseFloat(form.price) : 0,
    };

    const { error } = await supabase.from("events").insert(payload);
    if (error) {
      setStatus({ loading: false, error: error.message, success: false });
    } else {
      setStatus({ loading: false, error: "", success: true });
      setForm({ title: "", description: "", image_url: "", start_date: "", end_date: "", time: "", location: "", info_link: "", tickets_link: "", event_type: "free", price: 0, priority: 99 });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload New Event</h2>

      {status.success && <p className="text-green-600 mb-4">Event uploaded successfully!</p>}
      {status.error && <p className="text-red-600 mb-4">{status.error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" required className="w-full p-2 border rounded" />
        <input name="start_date" type="date" value={form.start_date} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="end_date" type="date" value={form.end_date} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="time" value={form.time} onChange={handleChange} placeholder="Time (e.g., 7:00 PM)" className="w-full p-2 border rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
        <input name="info_link" value={form.info_link} onChange={handleChange} placeholder="Info Link" className="w-full p-2 border rounded" />
        <input name="tickets_link" value={form.tickets_link} onChange={handleChange} placeholder="Tickets Link" className="w-full p-2 border rounded" />

        <div className="flex gap-4 items-center">
          <label><input type="radio" name="event_type" value="free" checked={form.event_type === "free"} onChange={handleChange} /> Free</label>
          <label><input type="radio" name="event_type" value="ticketed" checked={form.event_type === "ticketed"} onChange={handleChange} /> Ticketed</label>
        </div>

        {form.event_type === "ticketed" && (
          <input name="price" value={form.price} onChange={handleChange} placeholder="Ticket Price" type="number" className="w-full p-2 border rounded" />
        )}

        <input name="priority" value={form.priority} onChange={handleChange} placeholder="Priority (lower = featured)" type="number" className="w-full p-2 border rounded" />

        <button type="submit" disabled={status.loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {status.loading ? "Uploading..." : "Upload Event"}
        </button>
      </form>
    </div>
  );
};

export default AdminUploadEvent;
