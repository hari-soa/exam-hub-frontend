import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

const TOKEN_KEYS = ["token", "examhub_token"];
const USER_KEYS = ["user", "examhub_user"];

const getToken = () =>
  TOKEN_KEYS.map((key) => localStorage.getItem(key)).find(Boolean) || null;

const clearSession = () => {
  [...TOKEN_KEYS, ...USER_KEYS].forEach((key) => localStorage.removeItem(key));
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
