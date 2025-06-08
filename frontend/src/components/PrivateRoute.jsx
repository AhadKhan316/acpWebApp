// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) return <div className="text-center py-12">Checking authentication...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}


// ✅ To use this in App.jsx

/*
import PrivateRoute from './components/PrivateRoute';
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
<Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
*/
