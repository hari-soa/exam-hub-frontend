import { Link } from "react-router-dom";
import { CalendarClock, Lock, Unlock } from "lucide-react";
import { adminExamList } from "../data/mockData";

const statusStyles = {
  available: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
  disabled: "bg-slate-100 text-slate-700",
};

const statusLabels = {
  available: "Disponible",
  in_progress: "En cours",
  disabled: "Désactivé",
};

export default function AdminExams() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Examens</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">Gestion des examens</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {adminExamList.map((exam) => (
          <div key={exam.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-slate-800">{exam.title}</h3>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[exam.status]}`}>
                      {statusLabels[exam.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{exam.course} • {exam.window}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    {exam.locked ? <Lock className="h-3.5 w-3.5 text-rose-500" /> : <Unlock className="h-3.5 w-3.5 text-emerald-500" />}
                    <span>{exam.locked ? "Verrouillé - tentatives déjà enregistrées" : "Édition disponible"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 xl:justify-end">
                <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600">
                  {exam.attempts} tentatives
                </div>
                <Link
                  to={`/admin/exams/${exam.id}/questions`}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Questions
                </Link>
                <Link
                  to={`/admin/exams/${exam.id}/results`}
                  className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Résultats
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
