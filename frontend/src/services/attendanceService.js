// src/services/attendanceService.js

/**
 * Marks a user as attending an event in the 'user_events' table.
 * 
 * @param {object} supabase - The initialized Supabase client.
 * @param {string} userId - The authenticated user's ID.
 * @param {string} eventId - The UUID of the event.
 * @returns {Promise<object>} - The inserted attendance record.
 * @throws {Error} - If insertion fails due to RLS or validation error.
 */

// src/services/attendanceService.js
import { supabase } from "./supabaseClient";

export const markAttendance = async (userId, eventId) => {
  const { error } = await supabase.from("attendees").insert({ user_id: userId, event_id: eventId });
  if (error) throw new Error(error.message);
};


  