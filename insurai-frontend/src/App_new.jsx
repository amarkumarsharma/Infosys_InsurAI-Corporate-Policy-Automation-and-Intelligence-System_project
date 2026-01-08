import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Modern Homepage
import ModernHomepage from "./pages/ModernHomepage.jsx";

// Modern Employee Auth & Dashboard
import EmployeeLogin from "./pages/auth/EmployeeLogin_new.jsx";
import EmployeeRegister from "./pages/auth/EmployeeRegister_new.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ModernEmployeeDashboard from "./pages/dashboard/Employee/ModernEmployeeDashboard.jsx";

// Modern Admin Auth & Dashboard
import AdminLogin from "./pages/auth/AdminLogin_new.jsx";
import ModernAdminDashboard from "./pages/dashboard/Admin/ModernAdminDashboard.jsx";
import AdminPolicy from "./pages/dashboard/Admin/AdminPolicy.jsx";

// Modern Agent Auth & Dashboard
import AgentLogin from "./pages/auth/AgentLogin_new.jsx";
import AgentRegister from "./pages/auth/AgentRegister_new.jsx";
import ModernAgentDashboard from "./pages/dashboard/Agent/ModernAgentDashboard.jsx";

// Modern HR Auth & Dashboard
import HRLogin from "./pages/auth/HRLogin_new.jsx";
import ModernHRDashboard from "./pages/dashboard/Hr/ModernHRDashboard.jsx";

// PrivateRoute wrapper for authenticated routes
function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (role && userRole?.toLowerCase() !== role.toLowerCase()) return <Navigate to="/" replace />;

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage - Modern */}
        <Route path="/" element={<ModernHomepage />} />

        {/* Employee Routes - Modern */}
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/forgot-password" element={<ForgotPassword />} />
        <Route path="/employee/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute role="employee">
              <ModernEmployeeDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Routes - Modern */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <ModernAdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/policy"
          element={
            <PrivateRoute role="admin">
              <AdminPolicy />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register-agent"
          element={
            <PrivateRoute role="admin">
              <AgentRegister />
            </PrivateRoute>
          }
        />

        {/* Agent Routes - Modern */}
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/register" element={<AgentRegister />} />
        <Route
          path="/agent/dashboard"
          element={
            <PrivateRoute role="agent">
              <ModernAgentDashboard />
            </PrivateRoute>
          }
        />

        {/* HR Routes - Modern */}
        <Route path="/hr/login" element={<HRLogin />} />
        <Route
          path="/hr/dashboard"
          element={
            <PrivateRoute role="hr">
              <ModernHRDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
