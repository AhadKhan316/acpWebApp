
// File: components/Settings.jsx
import { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEdit, FaBell, FaTrashAlt, FaShieldAlt } from 'react-icons/fa';
import { supabase } from '../services/supabaseClient';

const Settings = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    notifications: {
      email: true,
      push: true
    },
    twoFactorEnabled: false,
    twoFactorSecret: '',
    qrCodeUrl: ''
  });

  const [activeTab, setActiveTab] = useState('account');
  const [editingField, setEditingField] = useState(null);
  const [otpCode, setOtpCode] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(prev => ({ ...prev, id: authUser.id, email: authUser.email }));

      const { data: settings } = await supabase.from('user_settings').select('*').eq('id', authUser.id).single();

      setUser(prev => ({
        ...prev,
        notifications: settings?.notifications || { email: true, push: true },
        twoFactorEnabled: settings?.two_factor_enabled || false,
        twoFactorSecret: settings?.two_factor_secret || ''
      }));
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e, field, subField = null) => {
    if (subField) {
      setUser(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
      }));
    } else {
      setUser(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSave = async (field) => {
    const { id, notifications, twoFactorEnabled, twoFactorSecret, newPassword } = user;

    if (field === 'password') {
      if (!newPassword || user.newPassword !== user.confirmNewPassword) {
        alert('Passwords do not match.');
        return;
      }
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        alert('Password update failed.');
      } else {
        alert('Password updated successfully.');
      }
      return;
    }

    if (field === 'notifications' || field === 'twoFactor') {
      await supabase.from('user_settings').upsert({
        id,
        notifications,
        two_factor_enabled: twoFactorEnabled,
        two_factor_secret: twoFactorSecret,
        updated_at: new Date()
      });
    }
    setEditingField(null);
    alert('Settings updated successfully.');
  };

  const enableTwoFactor = async () => {
    const secret = 'ABC123XYZ';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/ACP:${user.email}?secret=${secret}`;
    setUser(prev => ({
      ...prev,
      twoFactorSecret: secret,
      qrCodeUrl
    }));
  };

  const verifyTwoFactor = async () => {
    if (otpCode === '123456') {
      setUser(prev => ({ ...prev, twoFactorEnabled: true }));
      await handleSave('twoFactor');
    } else {
      alert('Invalid OTP.');
    }
  };

  const disableTwoFactor = async () => {
    setUser(prev => ({
      ...prev,
      twoFactorSecret: '',
      twoFactorEnabled: false,
      qrCodeUrl: ''
    }));
    await handleSave('twoFactor');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      await supabase.from('user_settings').delete().eq('id', user.id);
      await supabase.from('users').delete().eq('id', user.id);
      alert('Account deleted.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap border-b">
            {['account', 'password', 'twoFactor', 'notifications', 'delete'].map(tab => (
              <button
                key={tab}
                className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${activeTab === tab ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'account' && <FaUser className="inline-block mr-2" />}
                {tab === 'password' && <FaLock className="inline-block mr-2" />}
                {tab === 'twoFactor' && <FaShieldAlt className="inline-block mr-2" />}
                {tab === 'notifications' && <FaBell className="inline-block mr-2" />}
                {tab === 'delete' && <FaTrashAlt className="inline-block mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'account' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <div className="mt-1">
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
              {['currentPassword', 'newPassword', 'confirmNewPassword'].map((field, idx) => (
                <div key={field}>
                  <p className="text-sm text-gray-600">{['Current', 'New', 'Confirm New'][idx]} Password</p>
                  <input
                    type="password"
                    value={user[field]}
                    onChange={(e) => handleInputChange(e, field)}
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button onClick={() => handleSave('password')} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'twoFactor' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Two-Factor Authentication</h2>
              {user.twoFactorEnabled ? (
                <>
                  <p className="text-sm text-gray-600">2FA is active.</p>
                  <div className="flex justify-end">
                    <button onClick={disableTwoFactor} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      Disable 2FA
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">Scan the QR code in your authenticator app.</p>
                  {user.qrCodeUrl && <img src={user.qrCodeUrl} alt="2FA QR Code" className="w-40 h-40 my-2" />}
                  {!user.qrCodeUrl ? (
                    <button onClick={enableTwoFactor} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      Generate QR Code
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="p-2 border rounded-md w-full"
                      />
                      <button onClick={verifyTwoFactor} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Verify & Enable 2FA
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
              {['email', 'push'].map(type => (
                <div key={type} className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 capitalize">{type} Notifications</p>
                  <input
                    type="checkbox"
                    checked={user.notifications[type]}
                    onChange={(e) => handleInputChange(e, 'notifications', type)}
                    className="w-5 h-5 text-red-600"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button onClick={() => handleSave('notifications')} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'delete' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Delete Account</h2>
              <p className="text-sm text-gray-600">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <div className="flex justify-end">
                <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
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
