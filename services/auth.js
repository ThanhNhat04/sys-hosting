import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';

export const authService = {
  login: (email, password) => axiosClient.post(ENDPOINTS.AUTH.LOGIN, { email, password }),
  checkHealth: () => axiosClient.get(ENDPOINTS.HEALTH),
};

