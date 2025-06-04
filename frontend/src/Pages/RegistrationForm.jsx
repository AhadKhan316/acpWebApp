import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    id_number: '',
    email: '',
    phone: '',
    audition_file: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);
  
    const data = new FormData();
    data.append('full_name', formData.full_name);
    data.append('id_number', formData.id_number);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('audition_file', formData.audition_file);
  
    try {
      const response = await fetch('https://acpkhi.com/api/register', {
        method: 'POST',
        body: data,
        // Don't set Content-Type header - let the browser set it with boundary
      });
  
      // First check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Server returned non-JSON response');
      }
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }
  
      setMessage(result.message || 'Registration successful!');
      setFormData({ 
        full_name: '', 
        id_number: '', 
        email: '', 
        phone: '', 
        audition_file: null 
      });
      
      if (document.getElementById('audition_file')) {
        document.getElementById('audition_file').value = '';
      }
    } catch (err) {
      // Handle HTML error responses
      if (err.message.startsWith('<')) {
        setError('Server error occurred. Please try again later.');
      } else {
        setError(err.message || 'Error submitting form');
      }
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Sada-e-Watan Registration</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="id_number" className="block text-sm font-medium">ID Number</label>
          <input
            type="text"
            id="id_number"
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="audition_file" className="block text-sm font-medium">Audition File (Audio/Video)</label>
          <input
            type="file"
            id="audition_file"
            name="audition_file"
            accept="audio/*,video/*"
            onChange={handleChange}
            required
            className="w-full p-2"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;