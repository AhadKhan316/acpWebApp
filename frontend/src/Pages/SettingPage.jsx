// Updated Settings Page with working QRCode and Supabase integration

import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import QRCode from 'react-qr-code';
import { FaBell, FaShieldAlt } from "react-icons/fa";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setError("Failed to fetch user.");
          return;
        }
        setUser(user);

        const { data: settingData, error: settingsError } = await supabase
          .from("user_settings")
          .select("*")
          .eq("id", user.id)
          .single();

        if (settingsError) {
          setError("User settings not found.");
        } else {
          setSettings(settingData);
        }
      } catch (err) {
        setError("Unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateSettings = async (fields) => {
    const updates = { ...settings, ...fields };
    const { data, error } = await supabase
      .from("user_settings")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      console.error("Update error:", error);
    } else {
      setSettings(data[0]);
    }
  };

  const handleToggleNotifications = (type) => {
    const newNotifications = {
      ...settings.notifications,
      [type]: !settings.notifications?.[type],
    };
    updateSettings({ notifications: newNotifications });
  };

  const enable2FA = async () => {
    const secret = crypto.randomUUID(); // or use your backend to generate a real TOTP secret
    updateSettings({ two_factor_enabled: true, two_factor_secret: secret });
  };

  const disable2FA = () => {
    updateSettings({ two_factor_enabled: false, two_factor_secret: null });
  };

  if (loading) return <div className="p-8 text-gray-600">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Notifications */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <FaBell /> Notification Preferences
        </h2>
        <div className="space-y-2">
          {["email", "sms", "push"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifications?.[type] || false}
                onChange={() => handleToggleNotifications(type)}
              />
              <span className="capitalize">{type} notifications</span>
            </label>
          ))}
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <FaShieldAlt /> Two-Factor Authentication (2FA)
        </h2>
        {settings.two_factor_enabled ? (
          <div>
            <p className="mb-2 text-sm text-gray-700">
              2FA is enabled on your account.
            </p>
            <QRCode value={settings.two_factor_secret || "missing"} />
            <p className="text-xs mt-2">
              Scan this QR code using your authenticator app.
            </p>
            <button
              onClick={disable2FA}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Disable 2FA
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2 text-sm text-gray-700">
              2FA is currently disabled. Click below to enable.
            </p>
            <button
              onClick={enable2FA}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Enable 2FA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

