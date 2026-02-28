import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';

export const hostingService = {
  // Servers
  getServers: () => axiosClient.get(ENDPOINTS.HOSTING.SERVERS),
  getServer: (id) => axiosClient.get(ENDPOINTS.HOSTING.SERVER_ID(id)),
  createServer: (data) => axiosClient.post(ENDPOINTS.HOSTING.SERVERS, data),
  updateServer: (id, data) => axiosClient.put(ENDPOINTS.HOSTING.SERVER_ID(id), data),
  deleteServer: (id) => axiosClient.delete(ENDPOINTS.HOSTING.SERVER_ID(id)),
  // Plans
  getPlans: () => axiosClient.get(ENDPOINTS.HOSTING.PLANS),
  getPlan: (id) => axiosClient.get(ENDPOINTS.HOSTING.PLAN_ID(id)),
  // User Services
  getUserServices: () => axiosClient.get(ENDPOINTS.HOSTING.USER_SERVICES),
  renewService: (id) => axiosClient.post(ENDPOINTS.HOSTING.RENEW(id)),
};

