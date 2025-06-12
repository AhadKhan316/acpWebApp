// src/services/eventService.js
import { supabase } from "./supabaseClient";

export async function fetchUpcomingEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) throw new Error(error.message);

  return data.filter(e => new Date(e.start_date) >= new Date());
}
