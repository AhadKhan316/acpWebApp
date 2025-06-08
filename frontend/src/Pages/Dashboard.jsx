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
      user.user_metadata.avatar_url,
      user.user_metadata.instagram,
      user.user_metadata.linkedin,
      user.user_metadata.youtube,
      user.user_metadata.facebook
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
    if (!user.user_metadata.avatar_url) newSuggestions.push('Upload a profile picture');
    if (!user.user_metadata.instagram) newSuggestions.push('Add your Instagram link');
    if (!user.user_metadata.linkedin) newSuggestions.push('Add your LinkedIn profile');
    if (!user.user_metadata.youtube) newSuggestions.push('Add your YouTube channel');
    if (!user.user_metadata.facebook) newSuggestions.push('Add your Facebook profile');
    
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
    
    if (error) {
      console.error('Update failed:', error);
    } else {
      setUser(data.user);
    }
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
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onBlur={(e) => handleUpdate(key, e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate(key, e.target.value);
                if (e.key === 'Escape') setEditingField(null);
              }}
            />
            <button
              onClick={() => setEditingField(null)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="mt-1 flex justify-between items-center">
            <span className={!user.user_metadata[key] ? 'text-gray-400 italic' : ''}>
              {user.user_metadata[key] || 'Not provided'}
            </span>
            <button
              onClick={() => setEditingField(key)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-gray-100"
              aria-label={`Edit ${label}`}
            >
              <FaEdit size={14} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSocialLink = (platform, key, icon) => {
    const url = user.user_metadata[key];
    if (!url) return null;
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-gray-600 hover:text-red-600 mr-4"
      >
        {icon}
        <span className="ml-1 text-sm capitalize">{platform}</span>
      </a>
    );
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-6 py-8 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <AvatarUpload
            url={user.user_metadata?.avatar_url}
            onUpload={async (url) => {
              await supabase.auth.updateUser({
                data: { ...user.user_metadata, avatar_url: url }
              });
              const { data: { user: updatedUser } } = await supabase.auth.getUser();
              setUser(updatedUser);
            }}
            size="lg"
          />
          
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {user.user_metadata?.full_name || 'Your Name'}
            </h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            
            {/* Profile Completion */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Profile {completionPercentage === 100 ? 'Complete!' : 'Completion'}
                </span>
                <span className="text-sm font-medium text-red-600">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap items-center">
              {renderSocialLink('instagram', 'instagram', <FaInstagram size={18} />)}
              {renderSocialLink('linkedin', 'linkedin', <FaLinkedin size={18} />)}
              {renderSocialLink('youtube', 'youtube', <FaYoutube size={18} />)}
              {renderSocialLink('facebook', 'facebook', <FaFacebook size={18} />)}
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Profile Settings
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activeTab === 'overview' ? (
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h2>
            
            {/* Quick Stats or Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Profile Completion</h3>
                <p className="text-2xl font-semibold text-gray-900">{completionPercentage}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Date(user.updated_at || user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                <h3 className="text-lg font-medium text-red-800 mb-2">Complete Your Profile</h3>
                <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                  {suggestions.map((text, idx) => (
                    <li key={idx}>{text}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Bio Section */}
            {user.user_metadata?.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 whitespace-pre-line">{user.user_metadata.bio}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                {renderEditableField('Full Name', 'full_name')}
                {renderEditableField('Contact Number', 'contactNumber')}
                {renderEditableField('Gender', 'gender')}
                {renderEditableField('Date of Birth', 'dateOfBirth', 'date')}
                {renderEditableField('Bio', 'bio', 'textarea')}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
                {renderEditableField('Address', 'address')}
                {renderEditableField('City', 'city')}
                {renderEditableField('Country', 'country')}
                
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Social Links</h3>
                {renderEditableField('Instagram', 'instagram')}
                {renderEditableField('LinkedIn', 'linkedin')}
                {renderEditableField('YouTube', 'youtube')}
                {renderEditableField('Facebook', 'facebook')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}