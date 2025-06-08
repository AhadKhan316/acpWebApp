import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import AvatarUpload from '../components/AvatarUpload';
import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaEdit } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) console.error('Error loading user:', error);
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user || !user.user_metadata) return;
    const fields = [
      user.user_metadata.full_name,
      user.user_metadata.contactNumber,
      user.user_metadata.address,
      user.user_metadata.city,
      user.user_metadata.country,
      user.user_metadata.gender,
      user.user_metadata.dateOfBirth,
      user.user_metadata.bio,
      user.user_metadata.instagram,
      user.user_metadata.linkedin,
      user.user_metadata.youtube,
      user.user_metadata.facebook,
      user.user_metadata.avatar_url
    ];
    const filled = fields.filter(Boolean).length;
    const percent = Math.round((filled / fields.length) * 100);
    setCompletionPercentage(percent);

    const newSuggestions = [];
    if (!user.user_metadata.full_name) newSuggestions.push('Add your full name');
    if (!user.user_metadata.contactNumber) newSuggestions.push('Add your contact number');
    if (!user.user_metadata.address) newSuggestions.push('Add your address');
    if (!user.user_metadata.city) newSuggestions.push('Add your city');
    if (!user.user_metadata.country) newSuggestions.push('Add your country');
    if (!user.user_metadata.gender) newSuggestions.push('Add your gender');
    if (!user.user_metadata.dateOfBirth) newSuggestions.push('Add your date of birth');
    if (!user.user_metadata.bio) newSuggestions.push('Add a short bio');
    if (!user.user_metadata.instagram) newSuggestions.push('Add your Instagram link');
    if (!user.user_metadata.linkedin) newSuggestions.push('Add your LinkedIn profile');
    if (!user.user_metadata.youtube) newSuggestions.push('Add your YouTube channel');
    if (!user.user_metadata.facebook) newSuggestions.push('Add your Facebook profile');
    if (!user.user_metadata.avatar_url) newSuggestions.push('Upload a profile picture');
    setSuggestions(newSuggestions);
  }, [user]);

  const handleUpdate = async (key, value) => {
    const updates = {
      ...user.user_metadata,
      [key]: value
    };
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    if (error) console.error('Update failed:', error);
    else setUser(data.user);
    setEditingField(null);
  };

  const renderEditableField = (label, key, type = 'text') => {
    return (
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {editingField === key ? (
          <div className="mt-1 flex items-center gap-2">
            <input
              type={type}
              defaultValue={user.user_metadata[key] || ''}
              className="p-2 border rounded-md w-full"
              onBlur={(e) => handleUpdate(key, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate(key, e.target.value);
                if (e.key === 'Escape') setEditingField(null);
              }}
              autoFocus
            />
            <button
              onClick={() => setEditingField(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >Cancel</button>
          </div>
        ) : (
          <div className="mt-1 flex justify-between">
            <span>{user.user_metadata[key] || 'Not provided'}</span>
            <button
              onClick={() => setEditingField(key)}
              className="text-red-600 hover:text-red-800"
            >
              <FaEdit />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="flex items-center gap-4">
            <AvatarUpload
              url={user.user_metadata.avatar_url}
              onUpload={async (url) => {
                await supabase.auth.updateUser({
                  data: { ...user.user_metadata, avatar_url: url }
                });
                const {
                  data: { user: updatedUser },
                } = await supabase.auth.getUser();
                setUser(updatedUser);
              }}
            />
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.user_metadata.full_name}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Profile Completion</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{completionPercentage}% Complete</p>
            {suggestions.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-gray-600 mt-2 space-y-1">
                {suggestions.map((text, idx) => <li key={idx}>{text}</li>)}
              </ul>
            )}
          </div>

          {renderEditableField('Full Name', 'full_name')}
          {renderEditableField('Contact Number', 'contactNumber')}
          {renderEditableField('Address', 'address')}
          {renderEditableField('City', 'city')}
          {renderEditableField('Country', 'country')}
          {renderEditableField('Gender', 'gender')}
          {renderEditableField('Date of Birth', 'dateOfBirth', 'date')}
          {renderEditableField('Bio', 'bio')}
          {renderEditableField('Instagram', 'instagram')}
          {renderEditableField('LinkedIn', 'linkedin')}
          {renderEditableField('YouTube', 'youtube')}
          {renderEditableField('Facebook', 'facebook')}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
  