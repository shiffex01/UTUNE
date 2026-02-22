import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import TuneActivationRequests from "./pages/TuneActivationRequests";

function App() {
  return (
    <Router>
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