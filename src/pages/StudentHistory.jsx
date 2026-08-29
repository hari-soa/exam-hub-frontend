import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Eye,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import useFetch from "../hooks/useFetch";

export default function StudentHistory() {
  const { data: historyData, loading, error } = useFetch("/student/history");

  const history = historyData?.history || historyData || [];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Chargement de l'historique de vos résultats...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm">
        Erreur lors du chargement de l'historique. Veuillez réessayer plus tard.
      </div>
    );
  }

  const totalItems = history.length;

  const average =
    totalItems > 0
      ? (
          history.reduce(
            (sum, item) => sum + (item.score ?? item.note ?? 0),
            0,
          ) / totalItems
        ).toFixed(1)
      : "0.0";

  const passed = history.filter((item) => {
    const status = item.status || (item.passed ? "Réussi" : "Échoué");
    const score = item.score ?? item.note ?? 0;
    return status === "Réussi" || status === "open" || score >= 10;
  }).length;

  const latest = totalItems > 0 ? history[0] : null;
  const latestScore = latest ? (latest.score ?? latest.note ?? 0) : 0;
  const latestTotal = latest ? (latest.total ?? 20) : 20;
  const latestExamTitle = latest
    ? latest.exam || latest.examTitle || latest.title || "Examen"
    : "Aucun examen";
  const latestExamId = latest ? latest.examId || latest.id : "";

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100 mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Tableau de bord élève</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Historique des résultats
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Consultez vos performances récentes et accédez au détail de vos
            copies corrigées.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Moyenne générale
            </p>
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {average}
            </span>
            <span className="text-base font-medium text-slate-400">/ 20</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Basé sur {totalItems} examen{totalItems > 1 ? "s" : ""}
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Examens réussis
            </p>
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {passed}
            </span>
            <span className="text-base font-medium text-slate-400">
              / {totalItems}
            </span>
          </div>
          <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {totalItems > 0 ? Math.round((passed / totalItems) * 100) : 0}% de
            réussite
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Dernier résultat
            </p>
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {latestScore}
            </span>
            <span className="text-base font-medium text-slate-400">
              / {latestTotal}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 truncate">
            {latestExamTitle}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <h3 className="text-base font-bold text-slate-800">
            Détail des épreuves
          </h3>
        </div>

        <div className="overflow-x-auto">
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-slate-100 p-4 text-slate-400 mb-3">
                <AlertCircle className="h-8 w-8" />
              </div>
              <p className="text-base font-semibold text-slate-700">
                Aucun résultat disponible
              </p>
              <p className="text-sm text-slate-400 max-w-sm mt-1">
                Vous n'avez pas encore passé d'épreuves ou vos notes ne sont pas
                encore publiées.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Examen</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Note obtenue</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white text-sm">
                {history.map((result) => {
                  const id = result.id || result.examId;
                  const title =
                    result.exam || result.examTitle || result.title || "Examen";
                  const date =
                    result.date ||
                    (result.attemptedAt
                      ? new Date(result.attemptedAt).toLocaleDateString("fr-FR")
                      : "N/A");
                  const score = result.score ?? result.note ?? 0;
                  const total = result.total ?? 20;
                  const status =
                    result.status || (score >= 10 ? "Réussi" : "À renforcer");

                  return (
                    <tr
                      key={id}
                      className="group transition-colors duration-150 hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {title}
                      </td>

                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {date}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900">
                          {score}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">
                          {" "}
                          / {total}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "Réussi"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : status === "À renforcer"
                                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                : "bg-slate-100 text-slate-700 border border-slate-200/60"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              status === "Réussi"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Link
                          to={`/student/exams/${id}/result`}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:border-blue-300 hover:bg-blue-600 hover:text-white hover:shadow"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Voir la copie</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
