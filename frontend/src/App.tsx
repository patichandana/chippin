import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { CreateExpense } from "./pages/CreateExpense";
import { CreateGroup } from "./pages/CreateGroup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/create-expense" element={<CreateExpense />} />
      <Route path="/create-group" element={<CreateGroup />} />
      {/* Add other routes here as needed */}
    </Routes>

);
}

export default App
