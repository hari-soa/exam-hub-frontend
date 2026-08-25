import { NavLink } from "react-router-dom";
import {
  ArrowLeftRight,
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserCircle2,
  Users,
} from "lucide-react";

const adminItems = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/admin/students", label: "Étudiants", icon: Users },
  { to: "/admin/cours", label: "Cours", icon: BookOpen },
  { to: "/admin/exams", label: "Examens", icon: ClipboardList },
  { to: "/admin/profile", label: "Profil", icon: UserCircle2 },
];

const studentItems = [
  { to: "/student", label: "Examens", icon: ClipboardList },
  { to: "/student/results", label: "Historique", icon: ArrowLeftRight },
  { to: "/student/profile", label: "Profil", icon: UserCircle2 },
];

export default function Sidebar({ role, onLogout, mobileOpen, setMobileOpen }) {
  const items = role === "admin" ? adminItems : studentItems;
  const open = Boolean(mobileOpen);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform md:relative md:inset-auto md:translate-x-0 md:w-72 ${open ? "translate-x-0" : "-translate-x-full"} md:sticky md:top-0 md:h-screen`}
      style={{ minHeight: "100dvh" }}
    >
      <div className="flex h-full flex-col p-5">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Plateforme</p>
            <h1 className="text-lg font-bold text-slate-800">Exam Hub</h1>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin" || to === "/student"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xs text-slate-500">Session</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{role === "admin" ? "Administrateur" : "Étudiant"}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onLogout();
              setMobileOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
