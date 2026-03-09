import axios from "axios";

const API = axios.create({
  // In dev: Vite proxy forwards /api → https://api.utune.com.ng
  // In production (Vercel): calls go directly to the backend URL
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

// Attach admin JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401 (expired/invalid token) or 403 (not admin)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminAuth");
      localStorage.removeItem("adminEmail");
      // Dispatch a custom event so the app can react without a full page reload
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);

// ── AUTH ────────────────────────────────────────────────────────────────────
export const sendAdminOTP = (email) =>
  API.post("/admin/send-otp", { email });

export const verifyAdminOTP = (email, otp) =>
  API.post("/admin/verify-otp", { email, otp });

// ── ADMIN — USERS ───────────────────────────────────────────────────────────
export const getAllUsers = () => API.get("/admin/users");
export const banUser    = (userId) => API.patch(`/admin/users/${userId}/ban`);
export const unbanUser  = (userId) => API.patch(`/admin/users/${userId}/unban`);

// ── ADMIN — STATS ───────────────────────────────────────────────────────────
export const getAdminStats = () => API.get("/admin/stats");

// ── ADMIN — ANALYTICS TIME-SERIES ───────────────────────────────────────────
// range: "12months" | "30days" | "7days"
export const getTimeSeries = (range = "12months") =>
  API.get("/admin/analytics/time-series", { params: { range } });

// ── ADMIN — TUNES ───────────────────────────────────────────────────────────
export const getAllTunes   = () => API.get("/admin/tunes");
export const approveTune  = (songId) => API.patch(`/admin/tunes/${songId}/approve`);
export const rejectTune   = (songId, reason = "") =>
  API.patch(`/admin/tunes/${songId}/reject`, reason ? { reason } : {});

// ── DASHBOARD (kept for future real endpoints) ──────────────────────────────
export const getDashboardStats = () => API.get("/dashboard/stats");
export const getAnalyticsData  = () => API.get("/dashboard/analytics");
export const getRecentActivity = () => API.get("/dashboard/activity");

export default API;