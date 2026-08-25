// src/components/Sidebar.jsx
import React from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileCheck,
  HelpCircle,
  BarChart3,
  LogOut,
  GraduationCap
} from "lucide-react";

export const Sidebar = ({ user, onLogout }) => {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Students", icon: Users },
    { name: "Courses", icon: BookOpen },
    { name: "Exams", icon: FileCheck },
    { name: "Questions", icon: HelpCircle },
    { name: "Results", icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-4 z-20">
      <div>
        <div className="flex items-center gap-3 px-3 py-2 mb-8">
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-500/10">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 leading-none">Exam Hub</h1>
            <span className="text-xs text-slate-400 font-medium">Administration</span>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-medium text-sm transition ${
                  item.active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} /> {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-3.5 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition cursor-pointer"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};