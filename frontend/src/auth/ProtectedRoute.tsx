import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
