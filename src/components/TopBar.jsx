import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopBar({ onMenuClick }) {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const profilePath = role === "admin" ? "/admin/profile" : "/student/profile";

  const getPageTitle = (pathname) => {
    if (pathname.includes("/admin/students")) return "Student Management";
    if (pathname.includes("/admin/cours")) return "Course Management";
    if (pathname.includes("/admin/exams/history")) return "Exam History";
    if (pathname.includes("/admin/exams")) return "Exam Management";
    if (pathname.includes("/admin")) return "Admin Dashboard";
    if (pathname.includes("/student/results")) return "History & Results";
    if (pathname.includes("/student/profile")) return "My Profile";
    if (pathname.includes("/student")) return "My Exams";
    return "ExamHub Platform";
  };

  return (
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-4">
          {onMenuClick && (
              <button
                  type="button"
                  onClick={onMenuClick}
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 active:scale-95 cursor-pointer lg:hidden"
                  aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
          )}
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-slate-800">
              {getPageTitle(location.pathname)}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-semibold text-slate-800">
            {user?.name || user?.email || "User"}
          </span>
            <span className="text-xs text-slate-500 capitalize">
            {role || user?.role || "User"}
          </span>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <button
                type="button"
                onClick={() => navigate(profilePath)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 active:scale-95 cursor-pointer shadow-xs hover:shadow-sm"
                title="My profile"
                aria-label="My profile"
            >
              <User className="h-4 w-4" />
            </button>

            <button
                type="button"
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-all duration-200 active:scale-95 cursor-pointer shadow-xs hover:shadow-sm"
                title="Log out"
                aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
  );
}