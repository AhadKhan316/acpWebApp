// File: pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import AvatarUpload from '../components/AvatarUpload';
import { FaEdit, FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error) setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user || !user.user_metadata) return;
    const fields = [
      'full_name', 'contactNumber', 'address', 'city', 'country', 'gender', 'dateOfBirth', 'bio',
      'avatar_url', 'instagram', 'linkedin', 'youtube', 'facebook'
    ];
    const filled = fields.filter(field => user.user_metadata[field]).length;
    const percent = Math.round((filled / fields.length) * 100);
    setCompletionPercentage(percent);
    const newSuggestions = fields.filter(field => !user.user_metadata[field]).map(field => `Add your ${field}`);
    setSuggestions(newSuggestions);

    const generateQR = async () => {
      if (percent === 100 && !user.user_metadata.qr_code) {
        const qrData = `acp-user:${user.id}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
        const { error } = await supabase.auth.updateUser({
          data: { ...user.user_metadata, qr_code: qrUrl }
        });
        if (!error) {
          const updated = await supabase.auth.getUser();
          setUser(updated.data.user);
        }
      }
    };
    generateQR();
  }, [user]);

  const handleUpdate = async (key, value) => {
    const updates = {
      ...user.user_metadata,
      [key]: value
    };
    const { data, error } = await supabase.auth.updateUser({ data: updates });
    if (!error) {
      setUser(data.user);
    }
    setEditingField(null);
  };

  const renderEditableField = (label, key, type = 'text') => (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {editingField === key ? (
        <div className="mt-1 flex items-center gap-2">
          <input
            type={type}
            defaultValue={user.user_metadata[key] || ''}
            className="p-2 border rounded-md w-full focus:ring-2 focus:ring-red-500"
            onBlur={(e) => handleUpdate(key, e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUpdate(key, e.target.value);
              if (e.key === 'Escape') setEditingField(null);
            }}
          />
          <button onClick={() => setEditingField(null)} className="text-sm text-gray-600">Cancel</button>
        </div>
      ) : (
        <div className="mt-1 flex justify-between items-center">
          <span className={!user.user_metadata[key] ? 'text-gray-400 italic' : ''}>
            {user.user_metadata[key] || 'Not provided'}
          </span>
          <button onClick={() => setEditingField(key)} className="text-red-600"><FaEdit size={14} /></button>
        </div>
      )}
    </div>
  );

  const renderSocialLink = (platform, key, icon) => {
    const url = user.user_metadata[key];
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 mr-4">
        {icon}<span className="ml-1 text-sm capitalize">{platform}</span>
      </a>
    ) : null;
  };

  if (!user) {
    return <div className="flex justify-center py-12">
      <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-red-600 rounded-full"></div>
    </div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 flex flex-col sm:flex-row items-start gap-6">
          <AvatarUpload
            onUpload={async (url) => {
              const { data } = await supabase.auth.getUser();
              setUser(data.user);
            }}
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {user.user_metadata?.full_name || 'Your Name'}
            </h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm font-medium text-red-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              {renderSocialLink('instagram', 'instagram', <FaInstagram size={18} />)}
              {renderSocialLink('linkedin', 'linkedin', <FaLinkedin size={18} />)}
              {renderSocialLink('youtube', 'youtube', <FaYoutube size={18} />)}
              {renderSocialLink('facebook', 'facebook', <FaFacebook size={18} />)}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <nav className="flex -mb-px">
            <button onClick={() => setActiveTab('overview')} className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'text-red-600 border-red-600' : 'text-gray-500'}`}>Overview</button>
            <button onClick={() => setActiveTab('profile')} className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'profile' ? 'text-red-600 border-red-600' : 'text-gray-500'}`}>Profile Settings</button>
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'overview' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Welcome to Your Dashboard</h2>
            {suggestions.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
                <h3 className="text-lg font-semibold text-red-800 mb-1">Suggestions</h3>
                <ul className="list-disc pl-5 text-sm text-red-700">
                  {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
            {user.user_metadata?.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 whitespace-pre-line">{user.user_metadata.bio}</p>
              </div>
            )}
            {user.user_metadata?.qr_code && (
              <div className="text-center mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Your Unique QR Code</h3>
                <img src={user.user_metadata.qr_code} alt="User QR Code" className="inline-block border p-2 rounded" />
                <p className="text-sm text-gray-500 mt-1">Scan this to verify your identity</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
              {renderEditableField('Full Name', 'full_name')}
              {renderEditableField('Contact Number', 'contactNumber')}
              {renderEditableField('Gender', 'gender')}
              {renderEditableField('Date of Birth', 'dateOfBirth', 'date')}
              {renderEditableField('Bio', 'bio')}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Location & Social</h3>
              {renderEditableField('Address', 'address')}
              {renderEditableField('City', 'city')}
              {renderEditableField('Country', 'country')}
              {renderEditableField('Instagram', 'instagram')}
              {renderEditableField('LinkedIn', 'linkedin')}
              {renderEditableField('YouTube', 'youtube')}
              {renderEditableField('Facebook', 'facebook')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
