import { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'ABC',
    imageUrl: '',
    contactNumber: '',
    address: '',
    city: '',
    country: '',
    gender: '',
    dateOfBirth: '',
    bio: 'Hi, I am a passionate learner looking to enhance my skills and grow professionally.',
    socialLinks: {
      instagram: '',
      linkedin: '',
      youtube: '',
      facebook: ''
    }
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const fields = [
      user.contactNumber,
      user.address,
      user.city,
      user.country,
      user.gender,
      user.dateOfBirth,
      user.bio,
      user.socialLinks.instagram,
      user.socialLinks.linkedin,
      user.socialLinks.youtube,
      user.socialLinks.facebook
    ];
    const filledFields = fields.filter(field => field !== '').length;
    const totalFields = fields.length;
    const percentage = Math.round((filledFields / totalFields) * 100);
    setCompletionPercentage(percentage);

    const newSuggestions = [];
    if (!user.contactNumber) newSuggestions.push('Add your contact number');
    if (!user.address) newSuggestions.push('Add your address');
    if (!user.city) newSuggestions.push('Add your city');
    if (!user.country) newSuggestions.push('Add your country');
    if (!user.gender) newSuggestions.push('Add your gender');
    if (!user.dateOfBirth) newSuggestions.push('Add your date of birth');
    if (!user.bio) newSuggestions.push('Add a short bio');
    if (!user.socialLinks.instagram) newSuggestions.push('Add your Instagram link');
    if (!user.socialLinks.linkedin) newSuggestions.push('Add your LinkedIn profile');
    if (!user.socialLinks.youtube) newSuggestions.push('Add your YouTube channel');
    if (!user.socialLinks.facebook) newSuggestions.push('Add your Facebook profile');
    setSuggestions(newSuggestions);
  }, [user]);

  const handleInputChange = (e, field, subField = null) => {
    if (subField) {
      setUser(prev => ({
        ...prev,
        [field]: { ...prev[field], [subField]: e.target.value }
      }));
    } else {
      setUser(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSave = async () => {
    setEditingField(null);
    // Backend API call to save updated user data
    // Example: await fetch('/api/user', { method: 'PUT', body: JSON.stringify(user) });
  };

  const ProfileImage = () => {
    const initial = user.name.charAt(0).toUpperCase();
    return (
      <div className="w-24 h-24 rounded-full bg-red-200 flex items-center justify-center text-3xl font-bold text-red-800 overflow-hidden">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <ProfileImage />
          <div className="text-center sm:text-left">
            <h1 className="mt-5 text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="text-gray-600">Joined: June 04, 2025</div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Profile Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{completionPercentage}% Complete</p>
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* About Me */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">About Me</h2>
          {editingField === 'bio' ? (
            <div>
              <textarea
                value={user.bio}
                onChange={(e) => handleInputChange(e, 'bio')}
                rows="4"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => setEditingField(null)}
                  className="px-4 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave('bio')}
                  className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-600">{user.bio}</p>
              <button
                onClick={() => setEditingField('bio')}
                className="text-red-600 hover:text-red-800"
              >
                <FaEdit />
              </button>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Number */}
            <div>
              <p className="text-sm text-gray-600">Contact Number</p>
              {editingField === 'contactNumber' ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={user.contactNumber}
                    onChange={(e) => handleInputChange(e, 'contactNumber')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('contactNumber')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-gray-800">{user.contactNumber || 'Not provided'}</p>
                  <button
                    onClick={() => setEditingField('contactNumber')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <p className="text-sm text-gray-600">Address</p>
              {editingField === 'address' ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => handleInputChange(e, 'address')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('address')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-gray-800">{user.address || 'Not provided'}</p>
                  <button
                    onClick={() => setEditingField('address')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* City */}
            <div>
              <p className="text-sm text-gray-600">City</p>
              {editingField === 'city' ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={user.city}
                    onChange={(e) => handleInputChange(e, 'city')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('city')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-gray-800">{user.city || 'Not provided'}</p>
                  <button
                    onClick={() => setEditingField('city')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Country */}
            <div>
              <p className="text-sm text-gray-600">Country</p>
              {editingField === 'country' ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={user.country}
                    onChange={(e) => handleInputChange(e, 'country')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('country')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-gray-800">{user.country || 'Not provided'}</p>
                  <button
                    onClick={() => setEditingField('country')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              {editingField === 'gender' ? (
                <div className="mt-1">
                  <select
                    value={user.gender}
                    onChange={(e) => handleInputChange(e, 'gender')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('gender')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-gray-800">{user.gender || 'Not provided'}</p>
                  <button
                    onClick={() => setEditingField('gender')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              {editingField === 'dateOfBirth' ? (
                <div className="mt-1">
                  <input
                    type="date"
                    value={user.dateOfBirth}
                    onChange={(e) => handleInputChange(e, 'dateOfBirth')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('dateOfBirth')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-gray-800">{user.dateOfBirth || 'Not provided'}</p>
                  <button
                    onClick={() => setEditingField('dateOfBirth')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Social Links</h2>
          <div className="space-y-4">
            {/* Instagram */}
            <div className="flex items-center">
              <FaInstagram className="text-pink-600 mr-3" />
              {editingField === 'instagram' ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={user.socialLinks.instagram}
                    onChange={(e) => handleInputChange(e, 'socialLinks', 'instagram')}
                    placeholder="Instagram URL"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('instagram')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className={user.socialLinks.instagram ? 'text-pink-600' : 'text-gray-400'}>
                    {user.socialLinks.instagram || 'Add Instagram'}
                  </span>
                  <button
                    onClick={() => setEditingField('instagram')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* LinkedIn */}
            <div className="flex items-center">
              <FaLinkedin className="text-red-700 mr-3" />
              {editingField === 'linkedin' ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={user.socialLinks.linkedin}
                    onChange={(e) => handleInputChange(e, 'socialLinks', 'linkedin')}
                    placeholder="LinkedIn URL"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('linkedin')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className={user.socialLinks.linkedin ? 'text-red-700' : 'text-gray-400'}>
                    {user.socialLinks.linkedin || 'Add LinkedIn'}
                  </span>
                  <button
                    onClick={() => setEditingField('linkedin')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* YouTube */}
            <div className="flex items-center">
              <FaYoutube className="text-red-600 mr-3" />
              {editingField === 'youtube' ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={user.socialLinks.youtube}
                    onChange={(e) => handleInputChange(e, 'socialLinks', 'youtube')}
                    placeholder="YouTube URL"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('youtube')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className={user.socialLinks.youtube ? 'text-red-600' : 'text-gray-400'}>
                    {user.socialLinks.youtube || 'Add YouTube'}
                  </span>
                  <button
                    onClick={() => setEditingField('youtube')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Facebook */}
            <div className="flex items-center">
              <FaFacebook className="text-red-600 mr-3" />
              {editingField === 'facebook' ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={user.socialLinks.facebook}
                    onChange={(e) => handleInputChange(e, 'socialLinks', 'facebook')}
                    placeholder="Facebook URL"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('facebook')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className={user.socialLinks.facebook ? 'text-red-600' : 'text-gray-400'}>
                    {user.socialLinks.facebook || 'Add Facebook'}
                  </span>
                  <button
                    onClick={() => setEditingField('facebook')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;