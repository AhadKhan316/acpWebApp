// src/main.jsx
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

// ✅ Supabase + Auth
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './services/supabaseClient';

// ✅ Your Custom Auth Context
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <SessionContextProvider supabaseClient={supabase}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SessionContextProvider>
  </BrowserRouter>
);
