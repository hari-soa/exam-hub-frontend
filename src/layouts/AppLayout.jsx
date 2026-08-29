import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  User,
  X,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import TopBar from "../components/TopBar";

export default function AppLayout({ role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminLinks = [
    {
      to: "/admin",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      end: true,
    },
    { to: "/admin/students", label: "Étudiants", icon: Users },
    { to: "/admin/cours", label: "Cours", icon: BookOpen },
    { to: "/admin/exams", label: "Examens", icon: ClipboardList, end: true },
    {
      to: "/admin/exams/history",
      label: "Historique examens",
      icon: ShieldCheck,
    },
  ];

  const studentLinks = [
    { to: "/student", label: "Mes examens", icon: ClipboardList, end: true },
    {
      to: "/student/results",
      label: "Historique & Résultats",
      icon: ShieldCheck,
    },
    { to: "/student/profile", label: "Mon profil", icon: User },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-sm shadow-blue-200">
              EH
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ExamHub
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {role === "admin" ? "Administration" : "Espace Étudiant"}
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">ExamHub v1.0</p>
            <p className="mt-0.5">Plateforme d'évaluation en ligne</p>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
