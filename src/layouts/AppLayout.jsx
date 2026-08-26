import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ role }) {
  const { logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:flex md:min-h-screen">
        <Sidebar
          role={role}
          onLogout={logout}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        <main className="flex-1">
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
