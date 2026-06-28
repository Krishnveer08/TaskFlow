import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../components/dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import Settings from "../pages/Settings";
import AIAssistant from "../pages/AIAssistant";
import ProtectedRoute from "../components/ProtectedRoute";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
         path="/dashboard"
         element={
        <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
        }
/>
        <Route
        path="/settings"
        element={
        <ProtectedRoute>
        <Settings />
        </ProtectedRoute>
        }
/>
        <Route path="/ai"
        element={
        <ProtectedRoute>
        <AIAssistant />
        </ProtectedRoute>
  }
/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;