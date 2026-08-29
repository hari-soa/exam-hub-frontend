import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Users,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const statusStyles = {
  Désactivé: "bg-slate-100 text-slate-700",
  Disponible: "bg-emerald-100 text-emerald-700",
  "En cours": "bg-amber-100 text-amber-700",
  disabled: "bg-slate-100 text-slate-700",
  available: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
};

function getStatusBadgeClass(status) {
  return statusStyles[status] || "bg-slate-100 text-slate-700";
}

const statCards = [
  { key: "students", label: "Étudiants inscrits", accent: "blue", icon: Users },
  { key: "courses", label: "Cours créés", accent: "violet", icon: BookOpen },
  {
    key: "exams",
    label: "Examens créés",
    accent: "emerald",
    icon: ClipboardCheck,
  },
  {
    key: "attempts",
    label: "Tentatives réalisées",
    accent: "amber",
    icon: CheckCircle2,
  },
];

export default function AdminDashboard() {
  const { data, loading, error } = useFetch("/admin/dashboard");

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Chargement du tableau de bord...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Erreur lors du chargement des données du tableau de bord depuis le
          serveur.
        </div>
      </div>
    );
  }

  const { overview = {}, ueStats = [], recentExams = [] } = data;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Vue d'ensemble</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">
            Tableau de bord
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            alert("Fonctionnalité d'exportation du rapport à connecter")
          }
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
        >
          <ArrowUpRight className="h-4 w-4" />
          Exporter le rapport
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ key, label, accent, icon: Icon }) => (
          <div
            key={key}
            className="h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100 rounded-2xl bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {(overview[key] || 0).toLocaleString()}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  accent === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : accent === "violet"
                      ? "bg-violet-100 text-violet-600"
                      : accent === "emerald"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              +12.4% vs. mois précédent
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              Statistiques par UE
            </h3>
            <span className="text-sm text-slate-500">Taux de réussite</span>
          </div>

          <div className="space-y-4">
            {ueStats.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">
                Aucune statistique disponible.
              </p>
            ) : (
              ueStats.map((ue) => (
                <div key={ue.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {ue.name}
                    </span>
                    <span className="text-slate-500">{ue.successRate}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500"
                      style={{ width: `${ue.successRate}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>{ue.students} étudiants</span>
                    <span>Moyenne {ue.average}/20</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              Examens récents
            </h3>
            <Link
              to="/admin/exams/history"
              className="cursor-pointer text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              7 derniers
            </Link>
          </div>

          <div className="space-y-4">
            {recentExams.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">
                Aucun examen récent.
              </p>
            ) : (
              recentExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 border border-slate-100 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {exam.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {exam.date} • {exam.attempts} tentatives
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 text-xs rounded-full font-medium ${getStatusBadgeClass(exam.status)}`}
                    >
                      {exam.status}
                    </span>
                    <Link
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      to={`/admin/exams/${exam.id}/results`}
                    >
                      Voir le détail
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
