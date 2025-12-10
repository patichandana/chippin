import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/getUserDetails";
import { logout as logoutService } from "../services/logout";

export interface AuthContextType {
  user: any | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await getUserDetails();
        if (res.ok) {
          const userInfo = await res.json();
          setUser(userInfo);
        } else {
          setUser(null);
        }
      } catch(e) {
        console.error("Session check failed:", e);
        setUser(null);
      } 

      setLoading(false);
    }
    checkSession();
  }, []);


  async function refreshUser() {
  try {
    const res = await getUserDetails();
    if (res.ok) {
      const userInfo = await res.json();
      setUser(userInfo);
    } else {
      setUser(null);
    }
  } catch (err) {
    console.error("Failed to refresh user:", err);
    setUser(null);
  }
}

async function logout() {
    try{
      const res = await logoutService();
    if (res.status !== "success") {
      console.error("Logout failed:", res.message);
      return;
    }

    await refreshUser();
    navigate('/login');
    } catch(err){
      console.error("Logout failed:", err);
    }
  }

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    loading,
    logout,
    refreshUser
  };

  useEffect(() => {
  console.log("AuthProvider state changed:", { user, loading });
}, [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
