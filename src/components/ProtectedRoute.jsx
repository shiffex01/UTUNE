import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Must have a real JWT token — plain "adminAuth" flag alone is not enough
  const token = localStorage.getItem("adminToken");

  // Basic JWT structure check: must have 3 dot-separated base64 parts
  const isValidToken = token && token.split(".").length === 3;

  if (!isValidToken) {
    // Clear any stale flags so the user is fully logged out
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminToken");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;