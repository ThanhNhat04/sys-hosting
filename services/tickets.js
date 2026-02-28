import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';

export const ticketService = {
  listTickets: () => axiosClient.get(ENDPOINTS.TICKETS.BASE),
  createTicket: (data) => axiosClient.post(ENDPOINTS.TICKETS.BASE, data),
  getTicket: (id) => axiosClient.get(ENDPOINTS.TICKETS.ID(id)),
  updateTicket: (id, data) => axiosClient.put(ENDPOINTS.TICKETS.ID(id), data),
  deleteTicket: (id) => axiosClient.delete(ENDPOINTS.TICKETS.ID(id)),

  listReplies: (id) => axiosClient.get(ENDPOINTS.TICKETS.REPLIES(id)),
  createReply: (id, content) => axiosClient.post(ENDPOINTS.TICKETS.REPLY_ACTION(id), { content }),
};
