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
export const markAttendance = async (supabase, userId, eventId) => {
    const { data, error } = await supabase
      .from("user_events")
      .insert([{ user_id: userId, event_id: eventId }]);
  
    if (error) throw new Error(error.message);
    return data;
  };
  