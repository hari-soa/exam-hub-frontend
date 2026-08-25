// src/components/Dashboard.jsx
import React from "react";
import {
  Users,
  BookOpen,
  FileText,
  BarChart2,
  Calendar,
  ChevronRight,
  Database,
  Code,
} from "lucide-react";

export const Dashboard = ({ user }) => {
  // --- Données factices pour reproduire le contenu de la maquette ---
  const stats = [
    {
      title: "Étudiants",
      value: "124",
      subtext: "Total inscrits",
      icon: Users,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Cours",
      value: "8",
      subtext: "Total créés",
      icon: BookOpen,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      title: "Examens",
      value: "12",
      subtext: "Total créés",
      icon: FileText,
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
    {
      title: "Tentatives",
      value: "89",
      subtext: "Total réalisées",
      icon: BarChart2,
      bgColor: "bg-rose-100",
      textColor: "text-rose-600",
    },
  ];

  const recentExams = [
    {
      id: 1,
      title: "Programmation II - POO",
      code: "PROG2",
      questions: 20,
      points: 70,
      status: "Disponible",
      statusBg: "bg-emerald-100 text-emerald-700",
      date: "20/05/2026 08:00 → 23/05/2026 18:00",
      icon: Code,
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Base de données - SQL",
      code: "BDD1",
      questions: 15,
      points: 15,
      status: "Disponible",
      statusBg: "bg-emerald-100 text-emerald-700",
      date: "22/05/2026 10:00 → 24/05/2026 12:00",
      icon: Database,
      iconColor: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      title: "Algorithmique - Structures",
      code: "ALGO",
      questions: 20,
      points: 20,
      status: "En cours",
      statusBg: "bg-amber-100 text-amber-700",
      date: "18/05/2026 08:00 → 21/05/2026 18:00",
      icon: Code,
      iconColor: "bg-amber-100 text-amber-600",
    },
  ];

  const ueStats = [
    { code: "PROG2", name: "Programmation II", percent: 72 },
    { code: "BDD1", name: "Base de données", percent: 65 },
    { code: "ALGO", name: "Algorithmique", percent: 58 },
    { code: "RESEAUX", name: "Réseaux", percent: 83 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. EN-TÊTE DU TABLEAU DE BORD */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Bienvenue, {user?.first_name || "Administrateur"} 👋{" "}
            <span className="block sm:inline text-xs sm:text-sm text-slate-400 mt-1 sm:mt-0">
              Voici un aperçu général de la plateforme.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 shadow-sm self-start sm:self-auto">
          <Calendar size={15} className="text-slate-400" />
          <span>20 mai 2026</span>
        </div>
      </div>

      {/* 2. CARTES KPI / STATISTIQUES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {stat.value}
                </span>
                <h3 className="text-sm font-semibold text-slate-700 mt-1">
                  {stat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{stat.subtext}</p>
              </div>
              <div className={`p-3.5 rounded-2xl ${stat.bgColor} ${stat.textColor}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. SECTION STATISTIQUES PAR UE (ANNEAU + DÉTAILS + BARRES) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-base">
            Statistiques par UE <span className="text-slate-400 font-normal text-xs">(taux de réussite)</span>
          </h2>
          <select className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Toutes les UE</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Anneau SVG de pourcentage */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6 p-4 rounded-xl bg-slate-50/50">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  strokeDasharray="72, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-slate-800">72%</span>
                <span className="block text-[10px] text-slate-400 font-medium">
                  Taux de réussite
                </span>
              </div>
            </div>

            {/* Infos de la matière sélectionnée */}
            <div className="space-y-3 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-slate-800 text-sm">Programmation II</h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    PROG2
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  72% des étudiants ont réussi cette UE.
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 pt-1">
                <div>
                  <span className="block text-sm font-bold text-slate-800">18</span>
                  <span className="text-[10px] text-slate-400">Étudiants</span>
                </div>
                <div className="h-6 w-[1px] bg-slate-200" />
                <div>
                  <span className="block text-sm font-bold text-slate-800">25</span>
                  <span className="text-[10px] text-slate-400">Tentatives</span>
                </div>
                <div className="h-6 w-[1px] bg-slate-200" />
                <div>
                  <span className="block text-sm font-bold text-slate-800">14,2 / 20</span>
                  <span className="text-[10px] text-slate-400">Moyenne générale</span>
                </div>
              </div>
            </div>
          </div>

          {/* Barres de progression par UE */}
          <div className="lg:col-span-7 space-y-3.5">
            {ueStats.map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-xs">
                <span className="w-16 font-bold text-slate-600 uppercase">
                  {item.code}
                </span>
                <span className="w-32 text-slate-500 truncate hidden sm:block">
                  {item.name}
                </span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="w-8 font-bold text-slate-700 text-right">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Voir toutes les statistiques <ChevronRight size={14} />
          </a>
        </div>
      </div>

      {/* 4. TABLEAU DES EXAMENS RÉCENTS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-base">Examens récents</h2>
          <a
            href="#"
            className="text-xs font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition"
          >
            Voir tous les examens
          </a>
        </div>

        <div className="space-y-3">
          {recentExams.map((exam) => {
            const Icon = exam.icon;
            return (
              <div
                key={exam.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition bg-white gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl ${exam.iconColor}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{exam.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {exam.code} • {exam.questions} questions • {exam.points} points
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 text-xs">
                  <span
                    className={`px-2.5 py-1 rounded-full font-semibold ${exam.statusBg}`}
                  >
                    {exam.status}
                  </span>

                  <span className="text-slate-400 font-medium">{exam.date}</span>

                  <button className="text-blue-600 hover:bg-blue-50 font-semibold px-3 py-1.5 rounded-lg transition">
                    Voir résultats
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};