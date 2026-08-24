import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";

const CONTAINER_STYLE = "min-h-screen bg-slate-50 text-slate-800 font-sans";
const NAV_STYLE =
  "bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm";
const BRAND_STYLE = "text-xl font-bold text-slate-800 flex items-center gap-2";
const BRAND_SPAN_STYLE = "text-blue-600";
const USER_INFO_STYLE = "flex items-center gap-4 text-sm";
const ROLE_BADGE_STYLE =
  "px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
const LOGOUT_BTN_STYLE =
  "px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer";

const MAIN_CONTENT_STYLE = "max-w-7xl mx-auto p-6";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [token]);

  const handleLoginSuccess = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  if (!token || !user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={CONTAINER_STYLE}>
      <nav className={NAV_STYLE}>
        <div className={BRAND_STYLE}>
          Exam <span className={BRAND_SPAN_STYLE}>Hub</span>
        </div>
        <div className={USER_INFO_STYLE}>
          <span className="font-medium">
            {user.first_name} {user.last_name}
          </span>
          <span
            className={`${ROLE_BADGE_STYLE} ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>
          <button onClick={handleLogout} className={LOGOUT_BTN_STYLE}>
            Sign Out
          </button>
        </div>
      </nav>

      <main className={MAIN_CONTENT_STYLE}>
        {user.role === "admin" ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            {}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Student Workspace</h1>
            {}
          </div>
        )}
      </main>
    </div>
  );
}
