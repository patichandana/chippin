import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { CreateExpense } from "./pages/CreateExpense";
import { CreateGroup } from "./pages/CreateGroup";
import { GuestRoute } from "./auth/GuestRoute";
import { ProtectedRoute } from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      { /* Public Routes */ }
      <Route path="/" element={
        <GuestRoute>
          <LandingPage />
        </GuestRoute>
        } />
      <Route path="/login" element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
        } />
      <Route path="/signup" element={
        <GuestRoute>
          <SignupPage />
        </GuestRoute>
          } />

      { /* Protected Routes */ }
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
        } />
      <Route path="/create-expense" element={
        <ProtectedRoute>
          <CreateExpense />
        </ProtectedRoute>
          } />
      <Route path="/create-group" element={
        <ProtectedRoute>
          <CreateGroup />
        </ProtectedRoute>
        } />
      {/* Add other routes here as needed */}
    </Routes>

);
}

export default App
