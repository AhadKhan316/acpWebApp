import { useState } from 'react';
import { FaUser, FaLock, FaEdit, FaBell, FaTrashAlt, FaShieldAlt } from 'react-icons/fa';

const Settings = () => {
  const [user, setUser] = useState({
    name: 'ABC',
    email: 'abc@example.com',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    twoFactorEnabled: false,
    twoFactorSecret: ''
  });

  const [activeTab, setActiveTab] = useState('account');
  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (e, field, subField = null) => {
    if (subField) {
      setUser(prev => ({
        ...prev,
        [field]: { ...prev[field], [subField]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }
      }));
    } else {
      setUser(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSave = async () => {
    setEditingField(null);
    // Backend API call to save updated settings
    // Example: await fetch('/api/settings', { method: 'PUT', body: JSON.stringify(user) });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Backend API call to delete account
      // Example: await fetch('/api/user', { method: 'DELETE' });
      alert('Account deleted successfully.');
    }
  };

  const enableTwoFactor = async () => {
    // Simulate generating 2FA secret (replace with backend call)
    const secret = 'ABC123-XYZ789'; // Placeholder, replace with actual 2FA secret from backend
    setUser(prev => ({ ...prev, twoFactorSecret: secret, twoFactorEnabled: true }));
    // Backend API call to enable 2FA
    // Example: await fetch('/api/two-factor/enable', { method: 'POST', body: JSON.stringify({ secret }) });
  };

  const disableTwoFactor = async () => {
    setUser(prev => ({ ...prev, twoFactorSecret: '', twoFactorEnabled: false }));
    // Backend API call to disable 2FA
    // Example: await fetch('/api/two-factor/disable', { method: 'POST' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap border-b">
            <button
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${activeTab === 'account' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('account')}
            >
              <FaUser className="inline-block mr-2" /> Account
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${activeTab === 'password' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('password')}
            >
              <FaLock className="inline-block mr-2" /> Password
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${activeTab === 'twoFactor' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('twoFactor')}
            >
              <FaShieldAlt className="inline-block mr-2" /> Two-Factor Authentication
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${activeTab === 'notifications' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell className="inline-block mr-2" /> Notifications
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${activeTab === 'delete' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('delete')}
            >
              <FaTrashAlt className="inline-block mr-2" /> Delete Account
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'account' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
              {/* Name */}
              <div>
                <p className="text-sm text-gray-600">Name</p>
                {editingField === 'name' ? (
                  <div className="mt-1">
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => handleInputChange(e, 'name')}
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
                        onClick={() => handleSave('name')}
                        className="text-red-600 hover:text-red-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-between items-center">
                    <p className="text-gray-800">{user.name}</p>
                    <button
                      onClick={() => setEditingField('name')}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <p className="text-sm text-gray-600">Email</p>
                {editingField === 'email' ? (
                  <div className="mt-1">
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange(e, 'email')}
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
                        onClick={() => handleSave('email')}
                        className="text-red-600 hover:text-red-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-between items-center">
                    <p className="text-gray-800">{user.email}</p>
                    <button
                      onClick={() => setEditingField('email')}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
              {/* Current Password */}
              <div>
                <p className="text-sm text-gray-600">Current Password</p>
                <input
                  type="password"
                  value={user.currentPassword}
                  onChange={(e) => handleInputChange(e, 'currentPassword')}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 mt-1"
                />
              </div>

              {/* New Password */}
              <div>
                <p className="text-sm text-gray-600">New Password</p>
                <input
                  type="password"
                  value={user.newPassword}
                  onChange={(e) => handleInputChange(e, 'newPassword')}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 mt-1"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <p className="text-sm text-gray-600">Confirm New Password</p>
                <input
                  type="password"
                  value={user.confirmNewPassword}
                  onChange={(e) => handleInputChange(e, 'confirmNewPassword')}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('password')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'twoFactor' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Two-Factor Authentication</h2>
              {user.twoFactorEnabled ? (
                <div>
                  <p className="text-sm text-gray-600">2FA is enabled. Use this secret to set up your authenticator app:</p>
                  <p className="text-gray-800 font-mono bg-gray-100 p-2 rounded-md mt-1">{user.twoFactorSecret}</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={disableTwoFactor}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Disable 2FA
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600">Two-Factor Authentication adds an extra layer of security to your account.</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={enableTwoFactor}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.notifications.email}
                    onChange={(e) => handleInputChange(e, 'notifications', 'email')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">SMS Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.notifications.sms}
                    onChange={(e) => handleInputChange(e, 'notifications', 'sms')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Push Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via push notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.notifications.push}
                    onChange={(e) => handleInputChange(e, 'notifications', 'push')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('notifications')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'delete' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Delete Account</h2>
              <p className="text-sm text-gray-600">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;