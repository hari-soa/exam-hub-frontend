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

  // Titre dynamique selon la page active
  const getPageTitle = (pathname) => {
    if (pathname.includes("/admin/students")) return "Gestion des étudiants";
    if (pathname.includes("/admin/cours")) return "Gestion des cours";
    if (pathname.includes("/admin/exams/history")) return "Historique des examens";
    if (pathname.includes("/admin/exams")) return "Gestion des examens";
    if (pathname.includes("/admin")) return "Tableau de bord Admin";
    if (pathname.includes("/student/results")) return "Historique & Résultats";
    if (pathname.includes("/student/profile")) return "Mon profil";
    if (pathname.includes("/student")) return "Mes examens";
    return "Plateforme ExamHub";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden transition"
            aria-label="Ouvrir le menu"
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
            {user?.name || user?.email || "Utilisateur"}
          </span>
          <span className="text-xs text-slate-500 capitalize">
            {role || user?.role || "Utilisateur"}
          </span>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button
            onClick={() => navigate(profilePath)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            title="Mon profil"
          >
            <User className="h-4 w-4" />
          </button>

          <button
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
            title="Se déconnecter"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}