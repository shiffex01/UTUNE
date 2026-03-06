import axios from "axios";

const API = axios.create({
  // Use a relative path so Vite dev server proxy (configured in vite.config.js)
  // will forward requests to the backend during development and avoid CORS.
  baseURL: "/api",
});

// Example endpoints
export const getDashboardStats = () => API.get("/dashboard/stats");
export const getAnalyticsData = () => API.get("/dashboard/analytics");
export const getRecentActivity = () => API.get("/dashboard/activity");

export default API;