// src/components/AvatarUpload.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function AvatarUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const avatar_path = user?.user_metadata?.avatar_url;
      if (avatar_path) {
        const { data } = supabase.storage.from('avatars').getPublicUrl(avatar_path);
        setAvatarUrl(data.publicUrl);
      }
    };
    fetchAvatar();
  }, []);

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${Date.now()}.${fileExt}`;

    setUploading(true);

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
    if (uploadError) {
      alert('Upload failed');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: filePath },
    });

    if (updateError) {
      alert('Error updating user profile');
    } else if (onUpload) {
      onUpload(data.publicUrl);
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-300 rounded-full" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="text-sm text-gray-700"
      />
    </div>
  );
}
