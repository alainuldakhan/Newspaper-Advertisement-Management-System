import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL ?? "";

const http = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle 401 and refresh token flow
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return http(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(`${API_BASE}/api/v1/Auth/refresh`, {
          refreshToken,
        });

        persistSession(data);
        processQueue(null, data.accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return http(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Persist auth session details in localStorage
const persistSession = ({
  accessToken,
  refreshToken,
  expiresAtUtc,
  role,
  userName,
}) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expiresAtUtc", expiresAtUtc);
  localStorage.setItem("userRole", role);
  localStorage.setItem("userName", userName);
};

export const register = async (payload) => {
  const { data } = await http.post("/api/v1/Auth/register", payload);
  persistSession(data);
  return data;
};

export const login = async (payload) => {
  const { data } = await http.post("/api/v1/Auth/login", payload);
  persistSession(data);
  return data;
};

export const logout = () => {
  [
    "accessToken",
    "refreshToken",
    "expiresAtUtc",
    "userRole",
    "userName",
  ].forEach((key) => localStorage.removeItem(key));
};

export default {
  register,
  login,
  logout,
};
