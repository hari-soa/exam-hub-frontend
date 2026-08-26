import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const bypassEnabled = import.meta.env.VITE_BYPASS_AUTH === "true";
const defaultBypassRole = import.meta.env.VITE_BYPASS_ROLE || "admin";

const buildMockUser = (role) => ({
  id: role === "admin" ? "ADM-1024" : "STD-2089",
  name: role === "admin" ? "Dr. Amina Kaci" : "Nassim Bensaid",
  email: role === "admin" ? "admin@examhub.fr" : "nassim.bensaid@campus.fr",
  role,
  avatar: role === "admin" ? "AK" : "NB",
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (bypassEnabled) {
      return buildMockUser(defaultBypassRole);
    }

    const savedUser = typeof window !== "undefined" ? localStorage.getItem("examhub_user") : null;
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    if (bypassEnabled) {
      return "bypass-token";
    }
    return typeof window !== "undefined" ? localStorage.getItem("examhub_token") || "" : "";
  });

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("examhub_token", newToken);
    localStorage.setItem("examhub_user", JSON.stringify(userData));
  };

  const updateUser = (updates) => {
    setUser((current) => {
      const nextUser = current ? { ...current, ...updates } : updates;

      if (nextUser && typeof window !== "undefined") {
        localStorage.setItem("examhub_user", JSON.stringify(nextUser));
      }

      return nextUser;
    });
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("examhub_token");
    localStorage.removeItem("examhub_user");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      role: user?.role ?? null,
      isBypass: bypassEnabled,
      login,
      updateUser,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
