// src/services/attendanceService.js
import { supabase } from "./supabaseClient";

export const markAttendance = async (userId, eventId) => {
  const { data, error } = await supabase
    .from("user_events")
    .insert({ user_id: userId, event_id: eventId });

  if (error) throw new Error(error.message);
  return data;
};
