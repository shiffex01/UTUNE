import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminLayout from "./layout/AdminLayout";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import TuneActivationRequests from "./pages/TuneActivationRequests";

// Listens for the auth:logout event fired by the axios interceptor
// and performs a soft React Router redirect — no full page reload
function AuthLogoutListener() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = () => navigate("/login", { replace: true });
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <AuthLogoutListener />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="requests" element={<TuneActivationRequests />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;