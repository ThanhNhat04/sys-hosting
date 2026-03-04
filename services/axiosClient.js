// import axios from 'axios';

// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://backend-tetras.talab.io.vn/',
//   headers: { 'Content-Type': 'application/json' },
// });

// axiosClient.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('accessToken');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (res) => res,
//   (err) => Promise.reject(err.response?.data || err.message)
// );

// export default axiosClient;

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export const fastpanelClient = axios.create({
  baseURL: "/api/fastpanel",
  headers: { "Content-Type": "application/json" },
});

const applyInterceptors = (instance, needsAuth = true) => {
  instance.interceptors.request.use((config) => {
    if (needsAuth && typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err.response?.data || err.message),
  );
};

applyInterceptors(axiosClient, true);
applyInterceptors(fastpanelClient, false);

export default { axiosClient, fastpanelClient };
