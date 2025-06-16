import { supabase } from "./supabaseClient";

export async function markAttendance(userId, eventId, status) {
  const { error } = await supabase
    .from("event_attendance")
    .upsert(
      { user_id: userId, event_id: eventId, status },
      { onConflict: ['user_id', 'event_id'] }
    );

  if (error) throw error;
}

export async function getUserAttendance(userId, eventId) {
  const { data, error } = await supabase
    .from("event_attendance")
    .select("status")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .single();

  if (error) return null;
  return data?.status || null;
}
