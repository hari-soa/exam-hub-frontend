import { Bell, ChevronDown, Menu, Search, Sparkles, UserRound } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationsData } from '../data/mockData';

export default function TopBar({ role, onMenuToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  u
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayName = user?.name || (role === 'admin' ? 'Dr. Amina Kaci' : 'Jean Rakoto');
  const roleLabel = role === 'admin' ? 'Administrateur' : 'Étudiant';
  const initials = displayName
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const profileRoute = role === 'admin' ? '/admin/profile' : '/student/profile';
  const notifications = notificationsData || [];
  const searchOptions =
      role === 'admin'
          ? [
            { label: 'Tableau de bord', to: '/admin' },
            { label: 'Étudiants', to: '/admin/students' },
            { label: 'Cours', to: '/admin/cours' },
            { label: 'Examens', to: '/admin/exams' },
            { label: 'Profil', to: '/admin/profile' },
          ]
          : [
            { label: 'Examens', to: '/student' },
            { label: 'Historique', to: '/student/results' },
            { label: 'Profil', to: '/student/profile' },
          ];

  const filteredSearchOptions = searchOptions.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={onMenuToggle}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 active:scale-95 md:hidden"
                aria-label="Ouvrir le menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="hidden items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-blue-700 md:flex">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">Exam Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative" ref={searchRef} >
              <button
                  type="button"
                  onClick={() => {
                    setSearchOpen((value) => !value);
                    setNotificationsOpen(false);
                    setDropdownOpen(false);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 active:scale-95"
                  aria-label="Recherche globale"
              >
                <Search className="h-4 w-4" />
              </button>

              {searchOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input
                          autoFocus
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="Rechercher..."
                          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <div className="mt-3 max-h-56 space-y-1 overflow-y-auto">
                      {filteredSearchOptions.length > 0 ? (
                          filteredSearchOptions.map((item) => (
                              <button
                                  key={item.to}
                                  type="button"
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery('');
                                    navigate(item.to);
                                  }}
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                              >
                                <span>{item.label}</span>
                                <span className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Go</span>
                              </button>
                          ))
                      ) : (
                          <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">
                            Aucun résultat trouvé.
                          </div>
                      )}
                    </div>
                  </div>
              )}
            </div>

            <div className="relative" ref={notifRef}>
              <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen((value) => !value);
                    setDropdownOpen(false);
                    setSearchOpen(false);
                  }}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 active:scale-95"
                  aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              {notificationsOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between px-1">
                      <p className="text-sm font-semibold text-slate-800">Notifications</p>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                    {notifications.length}
                  </span>
                    </div>

                    <div className="max-h-80 space-y-2 overflow-y-auto">
                      {notifications.length > 0 ? (
                          notifications.map((notification) => (
                              <div key={notification.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:bg-slate-100">
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${notification.type === 'exam' ? 'bg-blue-500' : 'bg-slate-400'}`} />
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-800">{notification.title}</p>
                                    <p className="mt-1 text-xs text-slate-600">{notification.message}</p>
                                    <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-slate-400">{notification.time}</p>
                                  </div>
                                </div>
                              </div>
                          ))
                      ) : (
                          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3 text-center text-sm text-slate-500">
                            Aucune notification pour le moment.
                          </div>
                      )}
                    </div>
                  </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-left transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  {initials || <UserRound className="h-4 w-4" />}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-slate-900">{displayName}</div>
                  <div className="text-[11px] text-slate-500">{roleLabel}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {dropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                    <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate(profileRoute);
                        }}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Mon profil
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
                    >
                      Déconnexion
                    </button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </header>
  );
}
