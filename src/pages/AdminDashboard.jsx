import { ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, ClipboardCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { adminDashboardData } from "../data/mockData";

const statusStyles = {
  "Désactivé": "bg-slate-100 text-slate-600 border border-slate-200",
  "Disponible": "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
  "En cours": "bg-amber-50 text-amber-700 border border-amber-200/80",
};

function getStatusBadgeClass(status) {
  return statusStyles[status] || "bg-slate-100 text-slate-600 border border-slate-200";
}

const statCards = [
  { key: "students", label: "Étudiants inscrits", accent: "blue", icon: Users },
  { key: "courses", label: "Cours créés", accent: "violet", icon: BookOpen },
  { key: "exams", label: "Examens créés", accent: "emerald", icon: ClipboardCheck },
  { key: "attempts", label: "Tentatives réalisées", accent: "amber", icon: CheckCircle2 },
];

export default function AdminDashboard() {
  const { overview, ueStats, recentExams } = adminDashboardData;

  return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">Vue d'ensemble</span>
            <h2 className="mt-0.5 text-2xl sm:text-3xl font-bold text-slate-900">Tableau de bord</h2>
          </div>
          <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer w-full sm:w-auto group"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Exporter le rapport
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map(({ key, label, accent, icon: Icon }) => (
              <div key={key} className="h-full flex flex-col justify-between border border-slate-200/80 rounded-2xl bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{overview[key].toLocaleString()}</p>
                  </div>
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border ${
                      accent === "blue" ? "bg-blue-50 border-blue-100 text-blue-600" :
                          accent === "violet" ? "bg-violet-50 border-violet-100 text-violet-600" :
                              accent === "emerald" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                                  "bg-amber-50 border-amber-100 text-amber-600"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-xs font-medium text-slate-500 flex items-center gap-1">
                  <span className="text-emerald-600 font-semibold">+12.4%</span> vs. mois précédent
                </p>
              </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Statistiques par UE</h3>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Taux de réussite</span>
            </div>

            <div className="space-y-4">
              {ueStats.map((ue) => (
                  <div key={ue.name} className="p-3 rounded-xl transition-all duration-200 hover:bg-slate-50/80 border border-transparent hover:border-slate-200/60">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">{ue.name}</span>
                      <span className="font-bold text-blue-600">{ue.successRate}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${ue.successRate}%` }} />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                      <span>{ue.students} étudiants</span>
                      <span>Moyenne <strong className="text-slate-700">{ue.average}/20</strong></span>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Examens récents</h3>
                <Link
                    to="/admin/exams/history"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition-all duration-150 cursor-pointer"
                >
                  7 derniers
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentExams.map((exam) => (
                    <div key={exam.id} className="p-3.5 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200 hover:bg-slate-50/80 hover:border-slate-200/80">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-slate-800 truncate">{exam.title}</h4>
                        <p className="text-xs text-slate-500">{exam.date} • {exam.attempts} tentatives</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                    <span className={`px-2.5 py-0.5 text-[10px] sm:text-xs rounded-full font-semibold ${getStatusBadgeClass(exam.status)}`}>
                      {exam.status}
                    </span>
                        <Link
                            className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-150 active:scale-95 cursor-pointer"
                            to={`/admin/exams/${exam.id}/results`}
                        >
                          Détails
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}