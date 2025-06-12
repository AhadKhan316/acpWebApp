import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminUploadEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    start_date: "",
    type: "free",
    price: 0,
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    const payload = {
      ...form,
      price: form.type === "ticketed" ? parseFloat(form.price) : 0,
      start_date: new Date(form.start_date).toISOString(),
    };

    const { error } = await supabase.from("events").insert(payload);
    if (error) {
      setStatus({ loading: false, error: error.message, success: false });
    } else {
      setStatus({ loading: false, error: "", success: true });
      setForm({ title: "", description: "", image_url: "", start_date: "", type: "free", price: 0 });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload New Event</h2>

      {status.success && <p className="text-green-600 mb-4">Event uploaded successfully!</p>}
      {status.error && <p className="text-red-600 mb-4">{status.error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded" />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" required className="w-full p-2 border rounded" />
        <input name="start_date" value={form.start_date} onChange={handleChange} type="datetime-local" required className="w-full p-2 border rounded" />

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="free" checked={form.type === "free"} onChange={handleChange} />
            Free
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="ticketed" checked={form.type === "ticketed"} onChange={handleChange} />
            Ticketed
          </label>
        </div>

        {form.type === "ticketed" && (
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Ticket Price"
            type="number"
            className="w-full p-2 border rounded"
          />
        )}

        <button type="submit" disabled={status.loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {status.loading ? "Uploading..." : "Upload Event"}
        </button>
      </form>
    </div>
  );
};

export default AdminUploadEvent;
