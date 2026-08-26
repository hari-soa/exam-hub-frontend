import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Eye, TrendingUp } from "lucide-react";
import { studentHistory } from "../data/mockData";

export default function StudentHistory() {
  const average = (studentHistory.reduce((sum, item) => sum + item.score, 0) / studentHistory.length).toFixed(1);
  const passed = studentHistory.filter((item) => item.status === "Réussi").length;
  const latestScore = studentHistory[0]?.score ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Historique</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">Mes résultats</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Moyenne</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{average}/20</span>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Réussis</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{passed}</span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Dernier essai</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{latestScore}</span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-600"><Clock3 className="h-5 w-5" /></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Examen</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {studentHistory.map((result) => (
                <tr key={result.id} className="transition hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{result.exam}</td>
                  <td className="px-4 py-3">{result.date}</td>
                  <td className="px-4 py-3">{result.score}/{result.total}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${result.status === "Réussi" ? "bg-emerald-100 text-emerald-700" : result.status === "À renforcer" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-700"}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/student/exams/${result.examId}/result`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" /> Voir ma copie
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
