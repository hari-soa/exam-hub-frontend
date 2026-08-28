import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserCircle2,
  Users,
  X,
} from 'lucide-react';

const adminItems = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/admin/students', label: 'Étudiants', icon: Users },
  { to: '/admin/cours', label: 'Cours', icon: BookOpen },
  { to: '/admin/exams', label: 'Examens', icon: ClipboardList },
  { to: '/admin/profile', label: 'Profil', icon: UserCircle2 },
];

const studentItems = [
  { to: '/student', label: 'Examens', icon: ClipboardList },
  { to: '/student/results', label: 'Historique', icon: ArrowLeftRight },
  { to: '/student/profile', label: 'Profil', icon: UserCircle2 },
];

export function Sidebar({ role, onLogout, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const items = role === 'admin' ? adminItems : studentItems;
  const open = Boolean(mobileOpen);
  const homePath = role === 'admin' ? '/admin' : '/student';

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && open) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, setMobileOpen]);

  return (
      <>
        {open && (
            <div
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-200 cursor-pointer md:hidden"
            />
        )}

        <aside
            aria-hidden={!open && window.innerWidth < 768}
            className={`fixed inset-y-0 left-0 z-50 w-full sm:w-80 transform border-r border-slate-200/80 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-40 md:h-screen md:w-72 md:translate-x-0 md:shadow-none ${
                open ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ minHeight: '100dvh' }}
        >
          <div className="flex h-full flex-col p-4 sm:p-5">
            <div className="mb-6 flex items-center justify-between">
              <button
                  type="button"
                  onClick={() => {
                    navigate(homePath);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 text-left transition-all duration-200 hover:opacity-80 hover:scale-[1.01] active:scale-[0.98] cursor-pointer group"
              >
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-all duration-200 group-hover:bg-blue-700 group-hover:shadow-blue-500/40">
                  <GraduationCap className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Plateforme</p>
                  <h1 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">Exam Hub</h1>
                </div>
              </button>

              <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-all duration-200 active:scale-95 cursor-pointer md:hidden"
                  aria-label="Fermer le menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
              {items.map(({ to, label, icon: Icon }) => (
                  <NavLink
                      key={to}
                      to={to}
                      end={to === '/admin' || to === '/student'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                          `relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                              isActive
                                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100/80 font-semibold shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-blue-600 hover:translate-x-1'
                          }`
                      }
                  >
                    {({ isActive }) => (
                        <>
                          {isActive && (
                              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600" />
                          )}
                          <Icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110 text-blue-600' : 'group-hover:scale-110'}`} />
                          <span className="truncate">{label}</span>
                        </>
                    )}
                  </NavLink>
              ))}
            </nav>

            <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 transition-colors duration-200 hover:bg-slate-100/70 hover:border-slate-200">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Session active</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700 truncate">
                  {role === 'admin' ? 'Administrateur' : 'Étudiant'}
                </p>
              </div>

              <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setMobileOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </aside>
      </>
  );
}

export default Sidebar;