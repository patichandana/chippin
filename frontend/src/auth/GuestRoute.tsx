import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export function GuestRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      console.log("GuestRoute - User is logged in, redirecting to /dashboard");
      navigate("/dashboard", { replace: true });
    }
  },[loading, isLoggedIn, navigate]);

  if (loading) return null; // or a spinner

  // If user is logged in → redirect them to dashboard
  if (isLoggedIn) return null;

  // If user is not logged in → allow them to see the page
  return children;
}
