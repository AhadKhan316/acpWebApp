import { supabase } from "./supabaseClient";

// Fetch upcoming events
export async function fetchUpcomingEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  if (error) throw error;
  return data;
}

// Mark user as attending
export async function markUserAttending(eventId, userId) {
  const { error } = await supabase.from("user_events").insert({
    user_id: userId,
    event_id: eventId,
  });

  if (error) throw error;
  return true;
}
