import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env variables

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export default supabase;
