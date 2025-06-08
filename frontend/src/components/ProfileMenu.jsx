import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function ProfileMenu() {
  const { session, supabase } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => await supabase.auth.signOut();

  if (!session) {
    return (
      <>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Login / Signup
        </button>
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  return (
    <div className="relative group">
      <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${session.user.email}`} className="w-8 h-8 rounded-full cursor-pointer" />
      <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 right-0 w-48 rounded z-50">
        <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
        <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
        <button onClick={handleLogout} className="block px-4 py-2 text-left w-full hover:bg-gray-100">Logout</button>
      </div>
    </div>
  );
}