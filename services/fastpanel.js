import fastpanelClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const fastpanelService = {
  getUsers: () => {
    return fastpanelClient.get(ENDPOINTS.ADMIN.USERS.BASE);
  },
  changePassword: (username, newPassword) => {
    return fastpanelClient.post(ENDPOINTS.ADMIN.USERS.CHPASS(username), {
      password: newPassword,
    });
  },

  disableUser: (id) => {
    return fastpanelClient.post(ENDPOINTS.ADMIN.USERS.DISABLE(id));
  },

  enableUser: (id) => {
    return fastpanelClient.post(ENDPOINTS.ADMIN.USERS.ENABLE(id));
  },

  updateQuota: (id, quotaLimit) => {
    return fastpanelClient.post(ENDPOINTS.ADMIN.USERS.QUOTA(id), {
      quota: quotaLimit,
    });
  },

  createUser: (userData) => {
    return fastpanelClient.post(ENDPOINTS.ADMIN.USERS.BASE, userData);
  },

  // --- QUẢN LÝ MÁY CHỦ (SERVERS) ---
  getServers: () => {
    return fastpanelClient.get(ENDPOINTS.ADMIN.SERVERS.BASE);
  },

  reloadServers: () => {
    return fastpanelClient.get(ENDPOINTS.ADMIN.SERVERS.RELOAD);
  },
};
