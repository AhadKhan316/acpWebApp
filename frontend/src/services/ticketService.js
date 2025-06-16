// src/services/ticketService.js
import axios from "axios";

const API_BASE = "https://urduconference.com/api"; // Your deployed backend domain

export async function createTicketOrder(eventId, amount, userDetails) {
  try {
    const res = await axios.post(`${API_BASE}/tickets/create`, {
      event_id: eventId,
      amount,
      customer_name: userDetails.name,
      customer_email: userDetails.email,
      customer_mobile: userDetails.mobile,
      customer_address: userDetails.address
    });

    return res.data; // includes payment_url or order info
  } catch (error) {
    console.error("Ticket Order Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Order creation failed");
  }
}
