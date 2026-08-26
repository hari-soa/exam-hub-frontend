import { Link } from "react-router-dom";
import { Clock3, ShieldCheck } from "lucide-react";
import { studentExams } from "../data/mockData";

const statusStyles = {
  Ouvert: "bg-emerald-100 text-emerald-700",
  "À venir": "bg-amber-100 text-amber-700",
};

export default function StudentExams() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Examens</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">Examens disponibles</h2>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          2 évaluations ouvertes
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {studentExams.map((exam) => (
          <div key={exam.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{exam.module}</span>
              <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[exam.status]}`}>
                {exam.status}
              </span>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-slate-800">{exam.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{exam.description}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Durée</p>
                <p className="mt-1 font-semibold text-slate-800">{exam.duration}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Niveau</p>
                <p className="mt-1 font-semibold text-slate-800">{exam.difficulty}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Questions</p>
                <p className="mt-1 font-semibold text-slate-800">{exam.questionsCount}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {exam.dueDate}
              </span>
              <Link to={`/student/exams/${exam.id}`} className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                {exam.status === "Ouvert" ? "Commencer" : "Voir"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
