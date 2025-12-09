import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function GuestRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // or a spinner

  // If user is logged in → redirect them to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not logged in → allow them to see the page
  return children;
}
