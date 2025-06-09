// File: src/pages/ManageEvents.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    price: 0,
    image_url: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });
    if (!error) setEvents(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: '', description: '', location: '', start_date: '', end_date: '', price: 0, image_url: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price) };

    if (editingId) {
      await supabase.from('events').update(payload).eq('id', editingId);
    } else {
      await supabase.from('events').insert([{ id: uuidv4(), ...payload }]);
    }

    resetForm();
    fetchEvents();
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await supabase.from('events').delete().eq('id', id);
      fetchEvents();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      {/* Event Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-md mb-10">
        {['title', 'description', 'location', 'start_date', 'end_date', 'image_url', 'price'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace('_', ' ')}</label>
            <input
              type={field.includes('date') ? 'datetime-local' : field === 'price' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleInputChange}
              required={field !== 'image_url'}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
          {editingId ? 'Update Event' : 'Create Event'}
        </button>
      </form>

      {/* Events Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Start</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(event => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(event.start_date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.location}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >Edit</button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
