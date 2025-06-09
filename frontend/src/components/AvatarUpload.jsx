// File: src/components/AvatarUpload.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function AvatarUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const loadAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const avatarPath = user?.user_metadata?.avatar_url;
      if (avatarPath) {
        const { data: imageData, error } = supabase.storage.from('avatars').getPublicUrl(avatarPath);
        if (!error) setAvatarUrl(imageData.publicUrl);
      }
    };
    loadAvatar();
  }, []);

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('User not found');
      setUploading(false);
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Remove old avatar if exists (optional cleanup)
    await supabase.storage.from('avatars').remove([filePath]);

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: imageData, error: urlError } = supabase.storage.from('avatars').getPublicUrl(filePath);
    if (urlError) {
      alert('Failed to retrieve uploaded image');
      setUploading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: filePath }
    });

    if (updateError) {
      alert('Failed to update profile');
    } else {
      setAvatarUrl(imageData.publicUrl);
      if (onUpload) onUpload(imageData.publicUrl);
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
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600">No Image</span>
        </div>
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
