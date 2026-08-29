import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === "true";
    const bypassRole = import.meta.env.VITE_BYPASS_ROLE || "student";

    if (bypassAuth) {
      const mockUser = {
        id: "user-mock-123",
        name: bypassRole === "admin" ? "Admin Principal" : "Nassim Bensaid",
        email:
          bypassRole === "admin"
            ? "admin@examhub.edu"
            : "nassim.bensaid@campus.fr",
        role: bypassRole,
      };
      setUser(mockUser);
      setRole(bypassRole);
      setIsLoading(false);
      return;
    }

    const storedUser =
      localStorage.getItem("user") || localStorage.getItem("examhub_user");
    const storedToken =
      localStorage.getItem("token") || localStorage.getItem("examhub_token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("examhub_token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("examhub_user", JSON.stringify(userData));
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("examhub_token");
    localStorage.removeItem("user");
    localStorage.removeItem("examhub_user");
    setUser(null);
    setRole(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        Chargement...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
