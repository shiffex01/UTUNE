import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change later
});

// Example endpoints
export const getDashboardStats = () => API.get("/dashboard/stats");
export const getAnalyticsData = () => API.get("/dashboard/analytics");
export const getRecentActivity = () => API.get("/dashboard/activity");

export default API;