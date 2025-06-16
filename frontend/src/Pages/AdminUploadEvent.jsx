// src/pages/AdminUploadEvent.jsx
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

const CLOUDINARY_UPLOAD_PRESET = "ACP_Upcoming";
const CLOUDINARY_CLOUD_NAME = "dfal1v8mr";

const AdminUploadEvent = () => {
  const defaultForm = {
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
  };

  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState({ loading: false, error: "", success: false });
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false });
    if (!error) setEvents(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImg(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, image_url: data.secure_url }));
      }
    } catch (error) {
      alert("Image upload failed!");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image_url) {
      setStatus({ loading: false, error: "Please upload an event image.", success: false });
      return;
    }

    setStatus({ loading: true, error: "", success: false });

    const payload = {
      ...form,
      price: form.event_type === "ticketed" ? parseFloat(form.price) : 0,
    };

    const result = editingId
      ? await supabase.from("events").update(payload).eq("id", editingId)
      : await supabase.from("events").insert(payload);

    const { error } = result;
    if (error) {
      setStatus({ loading: false, error: error.message, success: false });
    } else {
      setStatus({ loading: false, error: "", success: true });
      setForm(defaultForm);
      setEditingId(null);
      fetchEvents();
    }
  };

  const handleEdit = (event) => {
    setForm({
      ...event,
      price: event.price || 0,
      priority: event.priority || 99,
    });
    setEditingId(event.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        alert("Failed to delete event: " + error.message);
      } else {
        fetchEvents();
      }
    }
  };

  const handleClearImage = () => {
    setForm((prev) => ({ ...prev, image_url: "" }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editingId ? "Update Event" : "Upload New Event"}
      </h2>

      {status.success && <p className="text-green-600 mb-4">Event {editingId ? "updated" : "uploaded"} successfully!</p>}
      {status.error && <p className="text-red-600 mb-4">{status.error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
          {uploadingImg && <p className="text-sm text-gray-600 mt-1">Uploading image...</p>}
          {form.image_url && (
            <>
              <img src={form.image_url} alt="Event" className="w-full max-h-60 mt-2 rounded" />
              <button type="button" onClick={handleClearImage} className="text-red-500 text-sm underline mt-1">
                Remove current image
              </button>
            </>
          )}
        </div>

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

        <button type="submit" disabled={status.loading || uploadingImg} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {status.loading ? (editingId ? "Updating..." : "Uploading...") : (editingId ? "Update Event" : "Upload Event")}
        </button>
      </form>

      <hr className="my-10" />

      <h3 className="text-xl font-semibold mb-4">Existing Events</h3>
      <ul className="space-y-4">
        {events.map((ev) => (
          <li key={ev.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <strong>{ev.title}</strong> – {ev.start_date} to {ev.end_date}
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(ev)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(ev.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUploadEvent;
