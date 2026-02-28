// services/users.js
import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';

export const userService = {  // BẮT BUỘC phải có chữ export ở đây
  getMe: () => axiosClient.get(ENDPOINTS.USERS.ME),
  listUsers: () => axiosClient.get(ENDPOINTS.USERS.BASE),
  getUser: (id) => axiosClient.get(ENDPOINTS.USERS.ID(id)),
  updateUser: (id, data) => axiosClient.put(ENDPOINTS.USERS.ID(id), data),
  deleteUser: (id) => axiosClient.delete(ENDPOINTS.USERS.ID(id)),
};
