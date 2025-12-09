import { createContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: any | null;
  isLoggedIn: boolean;
  loading: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const userInfo = await res.json();
          setUser(userInfo);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
