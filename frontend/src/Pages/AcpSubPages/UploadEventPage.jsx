// 📁 src/pages/UploadEventPage.jsx
import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // assuming your auth hook

export default function UploadEventPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    image_url: "",
    type: "free",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = {
      ...form,
      price: form.type === "ticketed" ? parseFloat(form.price) : 0,
      start_date: new Date(form.start_date).toISOString(),
      end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
    };

    const { error } = await supabase.from("events").insert(payload);
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setForm({
        title: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        image_url: "",
        type: "free",
        price: 0,
      });
    }
    setLoading(false);
  };

  if (!user) return <p className="p-6 text-center">You must be logged in to upload events.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>

      {success && <p className="text-green-600 mb-4">Event posted successfully!</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" className="w-full p-2 border rounded" onChange={handleChange} value={form.title} required />
        <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" onChange={handleChange} value={form.description} required />
        <input type="text" name="location" placeholder="Location" className="w-full p-2 border rounded" onChange={handleChange} value={form.location} required />
        <input type="datetime-local" name="start_date" className="w-full p-2 border rounded" onChange={handleChange} value={form.start_date} required />
        <input type="datetime-local" name="end_date" className="w-full p-2 border rounded" onChange={handleChange} value={form.end_date} />
        <input type="text" name="image_url" placeholder="Image URL" className="w-full p-2 border rounded" onChange={handleChange} value={form.image_url} required />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="free" checked={form.type === "free"} onChange={handleChange} /> Free
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="ticketed" checked={form.type === "ticketed"} onChange={handleChange} /> Ticketed
          </label>
        </div>

        {form.type === "ticketed" && (
          <input
            type="number"
            name="price"
            placeholder="Ticket Price"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={form.price}
            required
          />
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Posting..." : "Post Event"}
        </button>
      </form>
    </div>
  );
}
