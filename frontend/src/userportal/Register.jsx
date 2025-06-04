import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful. Redirecting to login...');
        setTimeout(() => navigate('/userportal/login'), 1500);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold">Register</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Register</button>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default UserRegister;
