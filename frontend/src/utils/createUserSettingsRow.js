import { supabase } from '../services/supabaseClient';

export const createUserSettingsRow = async (userId) => {
  const { error } = await supabase.from('user_settings').insert({
    id: userId,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    two_factor_enabled: false,
    two_factor_secret: null,
  });

  if (error) console.error('Failed to create user_settings row:', error);
};
