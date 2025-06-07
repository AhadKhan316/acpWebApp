const { supabase } = require('../services/supabaseService');

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, avatar_url } = req.body;

  const { data, error } = await supabase
    .from('profiles')
    .update({ username, avatar_url })
    .eq('id', userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};