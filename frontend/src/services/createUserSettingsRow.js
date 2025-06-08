// services/createUserSettingsRow.js
import { supabase } from '../services/supabaseClient';

export const createUserSettingsRow = async (userId) => {
  const { error } = await supabase.from('user_settings').insert({ id: userId });
  if (error) console.error('Failed to create user_settings row:', error);
};
