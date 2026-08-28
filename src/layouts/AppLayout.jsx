import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ role }) {
  const { logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {mobileSidebarOpen && (
          <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden"
              aria-hidden="true"
          />
      )}
      <div className="md:flex md:min-h-screen">
        <Sidebar
          role={role}
          onLogout={logout}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        <main className="flex flex-1 flex-col min-w-0">
          <TopBar role={role} onMenuToggle={() => setMobileSidebarOpen((value) => !value)} />

          <div className="px-4 pb-8 pt-4 md:px-8 md:pb-10">
            <div className="mx-auto max-w-[1400px]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
